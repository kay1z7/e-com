"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import SignUp from "@/src/components/signUp/SignUp";
import { useCart } from "@/src/Context/cartContext";

import Button from "../../base/Button/Button";
import cls from "./CartOrderForm.module.scss";

const CartOrderForm = () => {
  const cart = useCart();
  const { buyNow, toggleBuyNow, setComment, setFullAddress, setSendItems } = useCart();
  const { cartItems } = cart;
  const cartItemsIds = cartItems.map((item) => ({
    barcodeId: Number(item.id),
    amount: Number(item.amount),
  }));
  const buyNowIds = { amount: Number(buyNow.amount), barcodeId: Number(buyNow.id) };
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  // const [handleSignUpSuccess, setIsVerificationModalOpen] = useState(false);
  const [inputsValid, setInputsValid] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const formRef = useRef<any>({ number: "+996" });
  const router = useRouter();
  // const handleSignUpSuccess = () => {
  //   setIsSignUpModalOpen(false);
  //   setIsVerificationModalOpen(true);
  // };

  // const handleVerificationSuccess = () => {
  //   setIsVerificationModalOpen(false);
  //   setIsLoggedIn(true);
  //   // Дополнительная логика после успешной верификации
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formRef.current[name] = value;

    setFullAddress(
      `City:${formRef.current.city !== undefined ? formRef.current.city : "Бишкек"}, ` +
        `Adress:${formRef.current.adress}`
    );
    setInputsValid(formRef.current.adress);
    setComment(formRef.current.comment || "нет комментария");
  };
  const goToQR = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    router.push("/basket/orderFormStep");
  };

  const fillBlanks = (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    setInvalidInput(true);
    setTimeout(() => {
      setInvalidInput(false);
    }, 2000);
  };

  let sendItems: any = []; // Выбираем и передаем товары с корзины или с buyNow
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  toggleBuyNow ? (sendItems = buyNowIds) : (sendItems = cartItemsIds);
  useEffect(() => {
    setSendItems(sendItems);
  }, []);

  return (
    <div className={cls.cartOrderFormWrapper}>
      <h1 className={cls.mainTitle}>Адрес доставки</h1>

      <form>
        <div className={cls.inputSection}>
          <div className={cls.inputBox}>
            <p className={cls.inputTitle}>
              Город <span>{invalidInput && "* Заполните поле"}</span>
            </p>
            <input
              className={cls.input}
              name="city"
              onChange={handleInputChange}
              value={formRef.current.city ? formRef.current.city : "Бишкек"}
            />
          </div>
          <div className={cls.inputBox}>
            <p className={cls.inputTitle}>
              Адрес <span>{invalidInput && "* Заполните поле"}</span>
            </p>
            <input className={cls.input} name="adress" onChange={handleInputChange} />
          </div>
          <div className={cls.inputBox}>
            <p className={cls.inputTitle}>Комментарий к заказу</p>
            <textarea className={cls.input} name="comment" onChange={handleInputChange} />
          </div>
        </div>
        <Button
          width="min(30rem, 100%)"
          onClick={inputsValid ? goToQR : fillBlanks}
          text="Продолжить"
          variant="blue"
        />
      </form>
      {isSignUpModalOpen && <SignUp onClose={() => setIsSignUpModalOpen(false)} />}
    </div>
  );
};

export default CartOrderForm;
