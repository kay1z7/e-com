import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { useCart } from "@/src/Context/cartContext";
import { AUTH } from "@/src/lib/mutations/AuthMutation";

import cls from "./SignUp.module.scss";

const SignUp = ({ onClose }) => {
  const [numberDirty, setNumberDirty] = useState(false);
  const [numberError, setNumberError] = useState("Заполните номер!");
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("+996");
  const [name, setName] = useState("");
  const { setToken, setIsLoggedIn } = useCart();
  const [close, setClose] = useState(false);
  const [authMutation] = useMutation(AUTH);

  useEffect(() => {
    if (numberError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [numberError]);

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const numberHandler = (e) => {
    let inputValue = e.target.value.replace(/\D/g, "");

    if (inputValue.startsWith("996")) {
      inputValue = inputValue.slice(3);
    }

    if (inputValue.length > 9) {
      inputValue = inputValue.slice(0, 9);
    }

    let formatted = "+996 ";
    if (inputValue.length > 0) {
      formatted += inputValue.slice(0, 3);
    }
    if (inputValue.length > 3) {
      formatted += ` ${inputValue.slice(3, 5)}`;
    }
    if (inputValue.length > 5) {
      formatted += ` ${inputValue.slice(5, 7)}`;
    }
    if (inputValue.length > 7) {
      formatted += ` ${inputValue.slice(7)}`;
    }

    setNumber(formatted);

    if (inputValue.length < 9) {
      setNumberError("Введите номер полностью!");
      setFormValid(false);
    } else {
      setNumberError("");
      setFormValid(true);
    }
  };

  const blurHandler = (e) => {
    switch (e.target.value) {
      case "":
        setNumberDirty(true);
        break;
      default:
        break;
    }
  };

  const sendData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const phoneNumber = number.replace(/\D/g, "");
      const response = await authMutation({
        variables: { phone: `+${phoneNumber}`, customerName: name },
      });

      setToken(response.data.auth.access);
      setIsLoggedIn(true);
      localStorage.setItem("key", JSON.stringify(response?.data?.auth?.access));
      localStorage.setItem("refreshToken", JSON.stringify(response?.data?.auth?.refresh));
      localStorage.setItem("user", JSON.stringify(response?.data?.auth?.shops[0]));

      setClose(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  // const sendPhone = async () => {
  //   if (loading) return;
  //   setLoading(true);
  //   try {
  //     const phoneNumber = number.replace(/\D/g, "");
  //     const { data } = await authMutation({ variables: { phone: `+${phoneNumber}` } });
  //     setErrorResponse(null); // Reset errorResponse on success
  //     onSuccess();
  //   } catch (error) {
  //     setErrorResponse(error.message); // Set errorResponse on error
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (close) return null;

  return (
    <div className={cls.modal} onClick={onClose}>
      <div className={cls.card} onClick={(e) => e.stopPropagation()}>
        <div className={cls.cardHeader}>
          <h2 className={cls.title}>Регистрация</h2>

          {/* <p className={cls.number}>Введите ваш номер телефона и мы отправим вам код</p> */}
        </div>

        <form className={cls.list}>
          <div className={cls.inputWrapper}>
            <p
              style={{
                marginTop: "0",
                textAlign: "start",
                marginBottom: "8px",
              }}
              className={cls.number}
            >
              Имя*
            </p>
            <input onChange={nameHandler} value={name} className={cls.input} name="name" />
            <br />
            <br /> <br />
            <p
              style={{
                marginTop: "0",
                textAlign: "start",
                marginBottom: "8px",
              }}
              className={cls.number}
            >
              Номер телефона*
            </p>
            <input
              onChange={numberHandler}
              value={number}
              onBlur={blurHandler}
              className={cls.input}
              type="tel"
              name="number"
            />
            {number === "+996 " && <div className={cls.placeholder}>700 00 00 00</div>}
          </div>
          {/* {errorResponse && (
            <p
              style={{
                color: "rgb(179, 14, 14)",
                padding: "0",
                fontSize: "16px",
                marginBottom: "8px", // Added margin bottom for spacing
              }}
            >
              {errorResponse}
            </p>
          )} */}
          {numberDirty && numberError && (
            <p
              style={{
                color: "rgb(179, 14, 14)",
                padding: "0",
                fontSize: "16px",
              }}
            >
              {numberError}
            </p>
          )}
          <button
            disabled={!formValid || loading}
            type="button"
            className={cls.codeBtn}
            onClick={sendData}
          >
            {loading ? "Загрузка..." : "Продолжить"}
          </button>
          {/* <p className={cls.agreement}>
            Продолжая, вы соглашаетесь с{" "}
            <span>Условиями использования и Политикой конфиденциальности.</span>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
