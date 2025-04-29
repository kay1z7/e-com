"use client";

import { Radio } from "@mui/material";
import React, { useState } from "react";

import Mbank from "@/src/assets/icons/mbank.svg";
import Button from "@/src/components/base/Button/Button";
import { useCart } from "@/src/Context/cartContext";

import css from "./PaymentModal.module.scss";

const PaymentModal = ({ close, isNotLoggedIn, setIsNotLoggedIn, setGoToQrCode, setIsByCash }) => {
  const { isLoggedIn } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<string>("mbank");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  const goToQr = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isLoggedIn || setIsNotLoggedIn(!isNotLoggedIn);
    close(false);
    if (selectedMethod === "mbank") {
      setGoToQrCode(true);
    }

    if (selectedMethod === "byCash") {
      setIsByCash(true);
    }
  };

  return (
    <div className={css.modal} onClick={() => close(false)}>
      <div className={css.popup_block} onClick={(e) => e.stopPropagation()}>
        <div className={css.card}>
          <h2>Методы оплаты</h2>
          <br />
          <div className={`${css.input} ${css.input_wrap}`}>
            <div className={css.input_box}>
              <Radio
                color="default"
                checked={selectedMethod === "mbank"}
                value="mbank"
                onChange={handleChange}
              />
              <p>MBANK</p>
            </div>
            <Mbank />
          </div>
          <div className={css.input}>
            <Radio
              color="default"
              checked={selectedMethod === "byCash"}
              value="byCash"
              onChange={handleChange}
            />
            <p>Оплата при получении</p>
          </div>
          <div className={css.popup_block_method}>
            <Button width="100%" variant="blue" text="Продолжить" onClick={goToQr} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
