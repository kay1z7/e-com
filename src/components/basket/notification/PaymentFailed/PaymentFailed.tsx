"use client";

import { useRouter } from "next/navigation";
import React from "react";

import Fail from "@/src/assets/icons/fail.svg";
import DarkPopup from "@/src/components/popup/darkPopup/DarkPopup";

import Button from "../../../base/Button/Button";
import css from "./PaymentFailed.module.scss";

const PaymentFailed = () => {
  const router = useRouter();
  const handleToMain = () => {
    router.push("/basket/orderFormStep");
  };

  return (
    <div>
      <DarkPopup>
        <div className={css.popup_block}>
          <div className="icon">
            <Fail />
          </div>
          <div className={css.popup_block_title}>
            К сожалению, оплата не <br /> прошла, попробуйте снова.
          </div>
          <Button onClick={handleToMain} text="Попробовать еще раз" variant="blue" width="100%" />
        </div>
      </DarkPopup>
    </div>
  );
};

export default PaymentFailed;
