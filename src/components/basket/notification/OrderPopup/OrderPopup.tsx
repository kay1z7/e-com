import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import Success from "@/src/assets/icons/success.svg";
import Button from "@/src/components/base/Button/Button";
import DarkPopup from "@/src/components/popup/darkPopup/DarkPopup";

import css from "./OrderPopup.module.scss";

const OrderPopup = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
            <p>Ваш заказ успешно оформлен.</p> С вами свяжется менеджер
          </div>
          <Button onClick={handleToMain} text="На главную" variant="blue" width="100%" />
        </div>
      </DarkPopup>
    </div>
  );
};

export default OrderPopup;
