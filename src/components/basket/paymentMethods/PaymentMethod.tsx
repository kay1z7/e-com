"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import mbank from "@/src/assets/images/mbank.png";
import { useCart } from "@/src/Context/cartContext";

import Button from "../../base/Button/Button";
import InfoBlock from "../../layout/infoBlock/InfoBlock";
import css from "./PaymentMethod.module.scss";

const installmentPlans = [
  {
    id: 1,
    title: "3 месяцев",
    price: 6000,
  },
  {
    id: 2,
    title: "6 месяцев",
    price: 9000,
  },
  {
    id: 3,
    title: "9 месяцев",
    price: 12000,
  },
  {
    id: 4,
    title: "12 месяцев",
    price: 18000,
  },
];

const PaymentMethod = () => {
  const { buyNow, toggleBuyNow } = useCart();
  const router = useRouter();
  const goToDelivery = () => {
    router.push("/basket/orderForm");
  };
  const cartData = useCart();
  const { cartItems } = cartData;

  const totalPrice = cartItems?.reduce((acc, it) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    return +(acc + +it?.discountedPrice * it.amount);
  }, 0);
  const [installment, setInstallment] = useState(false);
  const [installmentPlan, setInstallmentPlan] = useState(null);

  const handleClick = (id) => {
    setInstallmentPlan(id);
  };

  return (
    <div>
      {/* <Breadcrumbs/> */}
      <InfoBlock>
        <h2>Выберите метод оплаты</h2>
        <div className={css.payment_wrapper}>
          <div className={css.payment_method}>
            <div className={css.select}>
              <div className={css.chose}>
                <input
                  type="radio"
                  name=""
                  id=""
                  checked={!installment}
                  onClick={() => {
                    setInstallment(false);
                  }}
                />
                <div className={css.title}>MBANK</div>
              </div>
              <Image src={mbank} alt="mbank-logo" />
            </div>
            <div className={css.select}>
              <div className={css.chose}>
                <input
                  type="radio"
                  name=""
                  id=""
                  checked={installment}
                  onClick={() => {
                    setInstallment(true);
                  }}
                />
                <div className={css.title}>В рассрочку от MBANK</div>
              </div>
              <Image src={mbank} alt="mbank-logo" />
            </div>
            {installment && (
              <div className={css.installment}>
                <div className={css.installment_plan}>
                  {installmentPlans.map((item) => (
                    <div key={item.id} className={css.installment_plan_item}>
                      <div
                        className={`${css.installment_plan_block} ${installmentPlan === item.id ? `${css.active}` : ""}`}
                        onClick={() => handleClick(item.id)}
                      >
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={css.installment_block}>
                  <div className={css.title}>Ежемесячная оплата:</div>
                  <div className={css.price}>2500 сом</div>
                </div>
                <div className={css.installment_block}>
                  <div className={css.title}>Итого:</div>
                  <div className={css.price}>18 000 сом</div>
                </div>
              </div>
            )}
            <Button onClick={goToDelivery} text="Продолжить" width="100%" variant="blue" />
          </div>
          <div className={css.leftSide}>
            <div className={css.list}>
              <p className={css.listTitle}>Ваш заказ</p>
              <div>
                <div className={css.leftSideListItem}>
                  <p className={css.leftSideListItemTitle}>
                    {" "}
                    Товары ({toggleBuyNow ? 1 : cartItems.length}){" "}
                  </p>
                  <p className={css.leftSideListItemPrice}>
                    {" "}
                    {toggleBuyNow ? Number(buyNow?.discountedPrice) : totalPrice} с
                  </p>
                </div>
                <div className={css.leftSideListItem}>
                  <p className={css.leftSideListItemTitle}>Доставка</p>
                  <p className={css.leftSideListItemPrice}>500 с</p>
                </div>
              </div>
              <div className={css.leftSideListItem}>
                <p className={css.leftSideListItemTotal}>Итого</p>
                <p className={css.leftSideListItemTotal}>
                  {toggleBuyNow
                    ? Number(buyNow?.discountedPrice) + 500
                    : totalPrice
                      ? totalPrice + 500
                      : 0}{" "}
                  с
                </p>
              </div>
            </div>
          </div>
        </div>
      </InfoBlock>
    </div>
  );
};

export default PaymentMethod;
