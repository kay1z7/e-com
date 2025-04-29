import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { confirmCode } from "@/src/api/api";

import cls from "./VerificationCodeForm.module.scss";

const countdownDuration = 60; // Длительность отсчета в секундах

const VerificationCodeForm = () => {
  const [userCode, setUserCode] = useState("");
  const [inputDisabled, setInputDisabled] = useState([false, false, false, false]);
  const [countDown, setCountdown] = useState(countdownDuration);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<any>([]);
  const router = useRouter();

  // useEffect(() => {
  //   if (isOpen) {
  //     inputRefs.current[0].focus();
  //   }
  // }, [isOpen]);

  useEffect(() => {
    if (!isCountingDown) {
      setIsCountingDown(true);
      setCountdown(countdownDuration);
    }
  }, [isCountingDown]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isCountingDown && countDown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
    if (countDown === 0) {
      setCountdown(0);
      setIsCountingDown(false);
    }
  }, [isCountingDown, countDown]);

  const handleSuccess = (resp) => {
    localStorage.setItem("key", JSON.stringify(resp?.data?.token));
    localStorage.setItem("user", JSON.stringify(resp?.data?.shop_data));
    router.push("/");
  };

  const restoreInputs = () => {
    inputRefs.current[0].focus();
    setUserCode("");
    setInputDisabled([false, false, false, false]);
    setActiveInput(0);
  };

  const handleSendCodeAgain = () => {
    setIsCountingDown(true);
    setCountdown(countdownDuration);
  };

  const handleInputFocus = (index) => {
    setActiveInput(index);
  };
  const handleError = () => {
    restoreInputs();
  };

  const evaluate = async (code) => {
    try {
      const resp = await confirmCode(code);
      handleSuccess(resp);
    } catch (error) {
      handleError();
    }
  };

  const handleInput = (e, index) => {
    const val = e.target.value;
    const cleanedValue = val.replace(/[^0-9]/g, "");
    e.target.value = cleanedValue;
    if (e.key === "Backspace") {
      e.preventDefault();

      if (userCode[index]) {
        const updatedUserCode = userCode.substr(0, index) + userCode.substr(index + 1);
        setUserCode(updatedUserCode);

        const updatedInputDisabled = inputDisabled.slice();
        updatedInputDisabled[index] = false;
        setInputDisabled(updatedInputDisabled);

        inputRefs.current[index].focus();
      } else if (index > 0) {
        setActiveInput(index - 1);
        inputRefs.current[index - 1].focus();
      }
    }
    if (cleanedValue) {
      const updatedUserCode = userCode + cleanedValue;
      setUserCode(updatedUserCode);

      const updatedInputDisabled = inputDisabled.slice();
      updatedInputDisabled[index] = true;
      setInputDisabled(updatedInputDisabled);

      if (updatedUserCode.length === 4) {
        evaluate(updatedUserCode);
      } else {
        const nextInputIndex = index + 1;
        if (nextInputIndex < 4) {
          setActiveInput(nextInputIndex);
          inputRefs.current[nextInputIndex].focus();
        }
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      if (index > 0 || userCode[index]) {
        const updatedUserCode = userCode.substring(0, index) + userCode.substring(index + 1);
        setUserCode(updatedUserCode);

        const updatedInputDisabled = inputDisabled.slice();
        updatedInputDisabled[index] = false;
        setInputDisabled(updatedInputDisabled);

        if (index > 0) {
          setActiveInput(index - 1);
          inputRefs.current[index - 1].focus();
        }
      }
    }
  };

  function handleContinue() {
    if (userCode.length === 4) {
      router.push("/");
    } else {
      console.log("Введите СМС-код");
    }
  }

  // if (!isOpen) return null;

  return (
    <div className={cls.modal}>
      <div className={cls.card} onClick={(e) => e.stopPropagation()}>
        <section id="codeForm" className={cls.codeForm}>
          <h2 className={cls.heading}>Введите СМС-код</h2>
          <div
            id="code"
            className={`${cls.shrinkable} ${
              inputDisabled.every((disabled) => disabled) && cls.shrink
            }`}
          >
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                disabled={inputDisabled[index]}
                value={userCode[index] || ""}
                onChange={(e) => handleInput(e, index)}
                onKeyUp={(e) => handleBackspace(e, index)}
                className={`${cls.input}
                ${activeInput === index && cls.activeInput}`}
                onFocus={() => handleInputFocus(index)}
                // ref={(inputRef) => (inputRefs.current[index] = inputRef)}
              />
            ))}
          </div>
          <div className={cls.countDown}>
            {countDown > 0 ? (
              <p>Получить код повторно через {countDown} сек</p>
            ) : (
              <button className={cls.sendButton} onClick={handleSendCodeAgain}>
                Получить код
              </button>
            )}
          </div>
          <div className={cls.buttonWrapper}>
            <button
              id="sendButton"
              type="button"
              className={cls.sendButton}
              onClick={handleContinue}
            >
              Продолжить
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VerificationCodeForm;
