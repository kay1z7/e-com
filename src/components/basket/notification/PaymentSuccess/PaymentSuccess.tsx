"use client";

import { useRouter } from "next/navigation";
import React from "react";

import Success from "@/src/assets/icons/success.svg";
import DarkPopup from "@/src/components/popup/darkPopup/DarkPopup";

import Button from "../../../base/Button/Button";
import css from "./PaymentSuccess.module.scss";

const PaymentSuccess = () => {
  const router = useRouter();
  const handleToMain = () => {
    router.push("/");
  };

  return (
    <div>
      <DarkPopup>
        <div className={css.popup_block}>
          <div className="icon">
            <Success />
          </div>
          <div className={css.popup_block_title}>
            <p>
              Спасибо, Ваша оплата <br /> прошла успешно!
            </p>{" "}
            С вами свяжется менеджер
          </div>
          <Button onClick={handleToMain} text="На главную" variant="blue" width="100%" />
        </div>
      </DarkPopup>
    </div>
  );
};

export default PaymentSuccess;
