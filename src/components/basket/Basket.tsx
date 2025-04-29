"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import BasketProductCard from "@/src/components/basket/basketProductCard/BasketProductCard";
import { useCart } from "@/src/Context/cartContext";

import InfoBlock from "../layout/infoBlock/InfoBlock";
import Loader from "../loader/Loader";
import ModalVerificationCodeForm from "../signUp/ModalVerificationCodeForm";
import SignUp from "../signUp/SignUp";
import cls from "./Basket.module.scss";
import BasketMobileCard from "./basketMobileCard/BasketMobileCard";

const number = "+996 ";

const Basket = () => {
  const [changedCart, setChangedCart] = useState(true);
  const router = useRouter();
  const [isWidth550, setIsWidth550] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const { removeFromCart, cartItems: cartProducts, setToggleBuyNow } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  // const [isAuth, setIsAusth] = useState(false);

  // const handleSignUpSuccess = () => {
  //   setIsSignUpModalOpen(false);
  //   setIsVerificationModalOpen(true);
  // };

  const handleVerificationSuccess = () => {
    setIsVerificationModalOpen(false);
    // setIsLoggedIn(true);
    // Дополнительная логика после успешной верификации
  };
  useEffect(() => {
    setIsMounted(true);
    const checkWidth = () => {
      setIsWidth550(window.innerWidth > 550);
    };
    // const token = localStorage.getItem("key");
    // const userData = localStorage.getItem("user");
    // @ts-ignore
    // setIsAusth(token && userData);

    // Вызываем функцию проверки ширины экрана при загрузке компонента
    checkWidth();

    // Добавляем слушатель события изменения размера окна
    window.addEventListener("resize", checkWidth);

    // Удаляем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  // const getCurrentDate = () => {
  //   const months = [
  //     "января",
  //     "февраля",
  //     "марта",
  //     "апреля",
  //     "мая",
  //     "июня",
  //     "июля",
  //     "августа",
  //     "сентября",
  //     "октября",
  //     "ноября",
  //     "декабря",
  //   ];

  //   const currentDate = new Date();
  //   const day = currentDate.getDate();
  //   const monthIndex = currentDate.getMonth();
  //   const year = currentDate.getFullYear();

  //   return `${day} ${months[monthIndex]} ${year}`;
  // };

  // useEffect(() => {
  //   setCartProducts(JSON.parse(localStorage.getItem("cart")));
  // }, [changedCart]);

  const handleSubmit = async () => {
    if (cartProducts.length > 0) {
      router.push("/basket/orderForm");
      setToggleBuyNow(false);
    }
    // if (isAuth) {
    //   submitOrder();
    // } else {
    //   try {
    //     const respAuth = await auth(data.number);
    //     // setResponse(respAuth?.data);
    //     setShowModal(true);
    //   } catch (error) {
    //     console.log(error);
    //     // Если возникла ошибка авторизации, попытка регистрации
    //     try {
    //       const request = await register(data.number);
    //       setShowModal(true);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   } finally {
    //   }
    // }
  };

  // const submitOrder = async () => {
  //   if (data) {
  //     try {
  //       // Группировка товаров по shop_id
  //       const goods = {};
  //       cartProducts.forEach((item) => {
  //         if (!goods[item.shop_id]) {
  //           goods[item.shop_id] = [];
  //         }
  //         goods[item.shop_id].push({
  //           size_id: item.size_id,
  //           good_id: item.id,
  //           amount: item.amount,
  //         });
  //       });

  //       // Отправка запроса для каждого магазина
  //       for (const shopId in goods) {
  //         const formData = {
  //           delivery: true,
  //           address: `${data.cityStreetHouse} ${data.entrance} ${data.apartment}`,
  //           additionally: data.number,
  //           order_note: data.orderComment,
  //           goods: goods[shopId],
  //         };

  //         // Получение токена из локального хранилища
  //         const token = JSON.parse(localStorage.getItem("key"));
  //         // Отправка запроса с токеном
  //         const response = await instance.post(`/market/shops/${shopId}/orders`, formData, {
  //           headers: {
  //             Authorization: `${token}`,
  //           },
  //         });
  //         localStorage.removeItem("cart");
  //       }
  //       router.push("/");
  //     } catch (error) {
  //       console.error("Ошибка при обработке заказа:", error);
  //       // Дополнительные действия в случае ошибки
  //     }
  //   } else {
  //     console.error("FormRef.current is null");
  //   }
  // };

  const deleteFromCart = (it) => {
    removeFromCart(it.id);
    setChangedCart(!changedCart);
  };

  const countUp = (it) => {
    const newItem = cartProducts?.filter((elem) => it.id === elem.id);
    newItem[0].amount = +newItem[0].amount + 1;
    localStorage?.setItem("cart", JSON.stringify(cartProducts));
    setChangedCart(!changedCart);
  };

  const countDown = (it) => {
    const newCart = [...cartProducts];
    const newItem = newCart.find((elem) => it.id === elem.id);
    if (newItem && newItem.amount > 1) {
      newItem.amount -= 1;
    } else {
      const indx = newCart.findIndex((item) => it.id === item.id);
      newCart.splice(indx, 1);
    }
    localStorage?.setItem("cart", JSON.stringify(newCart));
    setChangedCart(!changedCart);
  };

  const totalPrice = cartProducts?.reduce((acc, it) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    return +(acc + +it?.discountedPrice * it.amount);
  }, 0);

  if(!isMounted) {
    return <div><Loader/></div>
  }

  return (
    <InfoBlock>
      {isSignUpModalOpen && (
        <SignUp
          onClose={() => setIsSignUpModalOpen(false)}
        />
      )}
      {isVerificationModalOpen && (
        <ModalVerificationCodeForm
          number={number}
          isOpen={isVerificationModalOpen}
          onClose={() => setIsVerificationModalOpen(false)}
          onSuccess={handleVerificationSuccess}
        />
      )}
      <h1 className={cls.mainTitle}>Корзина</h1>
      <div className={cls.bothCards}>
        <div className={cls.rightSideWrapper}>
          {isWidth550 ? (
            <div className={cls.rightSide}>
              <div className={cls.mainInfo}>
                <div className={cls.basketWraper}>
                  {cartProducts?.map((it) => {
                    return (
                      <BasketProductCard
                        key={it.id}
                        it={it}
                        deleteFromCart={deleteFromCart}
                        countDown={countDown}
                        countUp={countUp}
                      />
                    );
                  })}
                </div>
              </div>
              <div className={cls.price}></div>
            </div>
          ) : (
            cartProducts?.map((it) => {
              return (
                <BasketMobileCard
                  key={it.id}
                  it={it}
                  deleteFromCart={deleteFromCart}
                  countDown={countDown}
                  countUp={countUp}
                />
              );
            })
          )}
        </div>
        <div className={cls.leftSide}>
          <div className={cls.list}>
            <p className={cls.listTitle}>Ваш заказ</p>
            <div>
              <div className={cls.leftSideListItem}>
                <p className={cls.leftSideListItemTitle}> Товары ({cartProducts.length}) </p>
                <p className={cls.leftSideListItemPrice}> {totalPrice} с</p>
              </div>
              <div className={cls.leftSideListItem}>
                <p className={cls.leftSideListItemTitle}>Доставка</p>
                <p className={cls.leftSideListItemDeliveryPrice}>Бесплатно</p>
              </div>
            </div>
            <div className={cls.leftSideListItem}>
              <p className={cls.leftSideListItemTotal}>Всего</p>
              <p className={cls.leftSideListItemTotal}>{totalPrice || 0} с</p>
            </div>
          </div>
          <button className={cls.orderButton} onClick={handleSubmit}>
            Перейти к оформлению
          </button>
        </div>
      </div>
    </InfoBlock>
  );
};

export default Basket;
