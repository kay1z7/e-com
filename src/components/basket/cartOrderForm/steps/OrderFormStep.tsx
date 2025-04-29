"use client";

/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import Button from "@/src/components/base/Button/Button";
import { useCart } from "@/src/Context/cartContext";
import { AUTH } from "@/src/lib/mutations/AuthMutation";
import { CREATE_ORDER } from "@/src/lib/mutations/PaymentMutation";
import { PAYMENT_STATUS_QUERY } from "@/src/lib/mutations/PaymentStatus";

import OrderPopup from "../../notification/OrderPopup/OrderPopup";
import PaymentFailed from "../../notification/PaymentFailed/PaymentFailed";
import PaymentSuccess from "../../notification/PaymentSuccess/PaymentSuccess";
import PaymentModal from "../../paymentMethods/paymentModal/PaymentModal";
import css from "./OrderFormStep.module.scss";

interface PaymentStatusQueryResponse {
  paymentStatus: string;
}

interface PaymentStatusQueryVariables {
  orderId: number;
}

const OrderFormStep = () => {
  const [invalidInput, setInvalidInput] = useState(false);
  const formRef = useRef<any>({ number: "+996" });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [inputsValid, setInputsValid] = useState(false);
  const [goToQrCode, setGoToQrCode] = useState(false);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);
  const [isByCash, setIsByCash] = useState<boolean>(false);

  const {
    isLoggedIn,
    paymentSuccess,
    setPaymentSuccess,
    orderId,
    setOrderId,
    fullAddress,
    comment,
    sendItems,
    setDeepLink,
    isMobile,
    token,
    setToken,
    setIsLoggedIn,
  } = useCart();
  const router = useRouter();
  const [number, setNumber] = useState("+996");
  const [userName, setUserName] = useState("");
  const [authMutation] = useMutation(AUTH);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage?.getItem("user");
      const user = JSON.parse(`${userData}`);

      if (isLoggedIn) {
        setUserName(user.user.firstName);
        setNumber(user.name);
        setInputsValid(true);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formRef.current[name] = value;

    setInputsValid(
      formRef.current.name && formRef.current.number && formRef.current.number !== "+996"
    );
    setUserName(formRef.current.name);
  };

  const fillBlanks = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setInvalidInput(true);
    setTimeout(() => {
      setInvalidInput(false);
    }, 2000);
  };

  const numberHandler = (e) => {
    let inputValue = e.target.value.replace(/\D/g, "");
    if (inputValue.length < 13) {
      if (!inputValue.startsWith("+996")) {
        if (!inputValue.startsWith("996")) {
          inputValue = `+996${inputValue}`;
        } else {
          inputValue = `+996${inputValue.slice(3)}`;
        }
      } else {
        inputValue = inputValue.replace(/\D/g, "");
      }

      inputValue = inputValue.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
      handleInputChange(e);
      setNumber(inputValue);
    }
  };
  const blurHandler = () => {
    formRef.current.number = formRef?.current?.number?.replace(/\s/g, ""); // Убираем пробелы перед сохранением
  };

  // Mutation
  const [createOrder] = useMutation(CREATE_ORDER);

  const sendData = async () => {
    try {
      const phoneNumber = number.replace(/\D/g, "");
      const response = await authMutation({
        variables: { phone: `+${phoneNumber}`, customerName: userName },
      });

      setToken(response.data.auth.access);
      setIsLoggedIn(true);
      localStorage.setItem("key", JSON.stringify(response?.data?.auth?.access));
      localStorage.setItem("refreshToken", JSON.stringify(response?.data?.auth?.refresh));
      localStorage.setItem("user", JSON.stringify(response?.data?.auth?.shops[0]));
    } catch (error) {
      console.log(error);
    }
  };
  const addOrder = async () => {
    try {
      const response = await createOrder({
        variables: {
          address: fullAddress,
          additionally: comment,
          items: sendItems,
        },
      });

      setGoToQrCode(false);

      const orderIdQr = Number(response.data.createOrder.order.id);
      setOrderId(orderIdQr);

      const paymentResponse = await fetch("https://backend.tanda.kg/payment/deeplink-status/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "X-CSRFToken": token,
        },
        body: JSON.stringify({
          order_id: orderIdQr,
        }),
      });

      const paymentData = await paymentResponse.json();
      setDeepLink(paymentData.deeplink_url);

      isMobile && router.push(paymentData.deeplink_url);
    } catch (error) {
      console.error("Error creating order or sending deeplink-status request:", error);
    }
  };
  const goToQR = async () => {
    try {
      addOrder();
      isMobile || router.push("/basket/qrCode");
    } catch (error) {
      console.log(error);
    }
  };

  const payByCash = async () => {
    try {
      const response = await createOrder({
        variables: {
          address: fullAddress,
          additionally: comment,
          items: sendItems,
        },
      });
  
      const orderIdQr = Number(response.data.createOrder.order.id);
      setOrderId(orderIdQr);
    }
    catch(error) {
      console.error(`Ошибка: ${error}`);
    }
  };

  const [shouldPoll, setShouldPoll] = useState(true);

  useEffect(() => {
    if (goToQrCode) {
      goToQR();
    }
    if (isByCash) {
      payByCash();
    }
  }, [isNotLoggedIn, goToQrCode, isLoggedIn, isByCash]);

  const { data, error, refetch } = useQuery<PaymentStatusQueryResponse, PaymentStatusQueryVariables>(
    PAYMENT_STATUS_QUERY,
    {
      variables: { orderId },
      pollInterval: shouldPoll ? 3000 : 0, // Проверяем статус оплаты каждые 3 секунды
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (data) {
      setPaymentSuccess(data.paymentStatus);
      if (data.paymentStatus === "Проведение платежа") {
        setShouldPoll(false);
      }
    }
    if (error) {
      setPaymentSuccess("null");
      console.log(error);
    }
  }, [data, error]);

  const goToPayment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    isLoggedIn || sendData();
    setShowPaymentModal(true);
  };

  const refreshPaymentStatus = async () => {
    try {
      await refetch();
    } catch (err) {
      console.error("Error fetching payment status:", err);
    }
  }
  return (
    <div className={css.cartOrderForm}>
      <h1 className={css.mainTitle}>Оформление заказа</h1>
      <div className={css.inputBox}>
        <p className={css.inputTitle}>
          Имя <span>{invalidInput && "* Заполните поле"}</span>
        </p>
        <input className={css.input} value={userName} name="name" onChange={handleInputChange} />
      </div>
      <div className={css.inputBox}>
        <p className={css.inputTitle}>
          Номер телефона <span>{invalidInput && "* Заполните поле"}</span>
        </p>
        <input
          className={css.input}
          name="number"
          type="tel"
          onChange={numberHandler}
          onBlur={blurHandler}
          value={number}
          maxLength={17}
        />
      </div>
      <Button
        text="Далее"
        variant="blue"
        width="min(30rem, 100%)"
        onClick={inputsValid ? goToPayment : fillBlanks}
      />
      <Button
        text="Обновить статус оплаты"
        variant="white"
        width="min(30rem, 100%)"
        onClick={refreshPaymentStatus}
      />
      {paymentSuccess === "Проведение платежа" && <PaymentSuccess />}
      {paymentSuccess === "Отмена платежа" && <PaymentFailed />}
      {isByCash && <OrderPopup />}
      {showPaymentModal && (
        <PaymentModal
          close={setShowPaymentModal}
          setGoToQrCode={setGoToQrCode}
          isNotLoggedIn={isNotLoggedIn}
          setIsNotLoggedIn={setIsNotLoggedIn}
          setIsByCash={setIsByCash}
        />
      )}
    </div>
  );
};

export default OrderFormStep;
