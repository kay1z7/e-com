import React, { useEffect, useRef } from "react";

import cls from "./VerificationCodeForm.module.scss";

interface ModalVerificationCodeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  number?: string;
}

// const countdownDuration = 60; // Длительность отсчета в секундах

const ModalVerificationCodeForm: React.FC<ModalVerificationCodeFormProps> = ({ onClose }) => {
  // const [userCode, setUserCode] = useState("");
  // const [inputDisabled, setInputDisabled] = useState([false, false, false, false]);
  // const [countDown, setCountdown] = useState(countdownDuration);
  // const [isCountingDown, setIsCountingDown] = useState(false);
  // const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<any>([]);
  // const router = useRouter();

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  // useEffect(() => {
  //   if (!isCountingDown) {
  //     setIsCountingDown(true);
  //     setCountdown(countdownDuration);
  //   }
  // }, [isCountingDown]);

  // useEffect(() => {
  //   if (isCountingDown && countDown > 0) {
  //     const timer = setInterval(() => {
  //       setCountdown((prevCountdown) => prevCountdown - 1);
  //     }, 1000);

  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }
  //   if (countDown === 0) {
  //     setCountdown(0);
  //     setIsCountingDown(false);
  //   }
  // }, [isCountingDown, countDown]);

  // // const handleInput = (e, index) => {
  // //   const val = e.target.value;
  // //   const cleanedValue = val.replace(/[^0-9]/g, "");
  // //   e.target.value = cleanedValue;
  // //   if (e.key === "Backspace") {
  // //     e.preventDefault();

  // //     if (userCode[index]) {
  // //       const updatedUserCode = userCode.substr(0, index) + userCode.substr(index + 1);
  // //       setUserCode(updatedUserCode);

  // //       const updatedInputDisabled = inputDisabled.slice();
  // //       updatedInputDisabled[index] = false;
  // //       setInputDisabled(updatedInputDisabled);

  // //       inputRefs.current[index].focus();
  // //     } else if (index > 0) {
  // //       setActiveInput(index - 1);
  // //       inputRefs.current[index - 1].focus();
  // //     }
  // //   }
  // //   if (cleanedValue) {
  // //     const updatedUserCode = userCode + cleanedValue;
  // //     setUserCode(updatedUserCode);

  // //     const updatedInputDisabled = inputDisabled.slice();
  // //     updatedInputDisabled[index] = true;
  // //     setInputDisabled(updatedInputDisabled);

  // //     if (updatedUserCode.length === 4) {
  // //       evaluate(updatedUserCode);
  // //     } else {
  // //       const nextInputIndex = index + 1;
  // //       if (nextInputIndex < 4) {
  // //         setActiveInput(nextInputIndex);
  // //         inputRefs.current[nextInputIndex].focus();
  // //       }
  // //     }
  // //   }
  // };

  // const handleBackspace = (e, index) => {
  //   if (e.key === "Backspace") {
  //     e.preventDefault();

  //     if (index > 0 || userCode[index]) {
  //       const updatedUserCode = userCode.substring(0, index) + userCode.substring(index + 1);
  //       setUserCode(updatedUserCode);

  //       const updatedInputDisabled = inputDisabled.slice();
  //       updatedInputDisabled[index] = false;
  //       setInputDisabled(updatedInputDisabled);

  //       if (index > 0) {
  //         setActiveInput(index - 1);
  //         inputRefs.current[index - 1].focus();
  //       }
  //     }
  //   }
  // };

  // const restoreInputs = () => {
  //   inputRefs.current[0].focus();
  //   setUserCode("");
  //   setInputDisabled([false, false, false, false]);
  //   setActiveInput(0);
  // };

  // const handleSendCodeAgain = () => {
  //   setIsCountingDown(true);
  //   setCountdown(countdownDuration);
  // };

  // const handleInputFocus = (index) => {
  //   setActiveInput(index);
  // };

  // function handleContinue() {
  //   if (userCode.length === 4) {
  //     router.push("/");
  //   } else {
  //     console.log("Введите СМС-код");
  //   }
  // }

  // const handleSuccess = (resp) => {
  //   localStorage.setItem("key", JSON.stringify(resp?.confirmCode?.token));
  //   localStorage.setItem("user", JSON.stringify(resp?.confirmCode?.shop));
  //   onSuccess();
  // };

  // const handleError = () => {
  //   restoreInputs();
  // };

  // // const [confirmCode] = useMutation(CONFIRM_CODE, {
  // //   onCompleted: (data) => handleSuccess(data),
  // //   onError: () => handleError(),
  // // });
  // // const evaluate = async (code) => {
  // //   try {
  // //     const resp = await confirmCode({ variables: { code } });
  // //   } catch (error) {
  // //     handleError();//wowow
  // //   }
  // // };
  // if (!isOpen) return null;

  return (
    <section id="codeForm" className={cls.codeFormModal} onClick={onClose}>
      {/* <div className={cls.codeFormModalBox} onClick={(e) => e.stopPropagation()}>
        <h2 className={cls.heading}>
          Введите код отправленный на номер <span>{number}</span>
        </h2>
        <div className={cls.codeFormFooter}>
          <div
            id="code"
            className={`${cls.shrinkable} ${
              inputDisabled.every((disabled) => disabled) && cls.shrink
            }`}
          >
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                placeholder=" "
                type="text"
                disabled={inputDisabled[index]}
                value={userCode[index] || ""}
                onChange={(e) => handleInput(e, index)}
                onKeyUp={(e) => handleBackspace(e, index)}
                className={`${cls.input} 
            ${activeInput === index && cls.activeInput}`}
                onFocus={() => handleInputFocus(index)}
                ref={(inputRef) => {
                  if (inputRef) {
                    inputRefs.current[index] = inputRef;
                  }
                }}
              />
            ))}
          </div>
          <div className={cls.countDown}>
            {countDown > 0 ? (
              <p>Отправить повторно через {countDown} сек</p>
            ) : (
              <button className={cls.sendAgainButton} onClick={handleSendCodeAgain}>
                Отправить повторно
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
              Подтвердить
            </button>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default ModalVerificationCodeForm;
