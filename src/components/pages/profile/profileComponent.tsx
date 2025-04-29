"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useCart } from "@/src/Context/cartContext";

import logo from "../../../assets/images/Logo.svg";
import Container from "../../Container/Container";
import cls from "./Profile.module.scss";

const ProfileComponent = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    setUser(JSON.parse(`${localStorage.getItem("user")}`));
  }, []);

  const [userIcon, setUserIcon] = useState<any>(null);
  const { handleLogout } = useCart();

  useEffect(() => {
    fetch(`${process.env.NEXT_IMAGES_URL}${user?.icon}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке изображения");
        }
        return response.blob();
      })
      .then((blob) => {
        setUserIcon(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.error(error);
        setUserIcon(logo); // Загрузка логотипа в случае ошибки
      });
  }, [user]);

  return (
    <Container>
      <div className={cls.profile__wrapper}>
        <h1 className={cls.profile__tittle}>Личный кабинет</h1>
        <div className={cls.profile__card}>
          <div>
            {userIcon ? (
              <Image src={userIcon.src} alt="" className={cls.logo} width={120} height={120} />
            ) : (
              <Image src={logo} alt="Logo" className={cls.logo} width={120} height={120} />
            )}
          </div>
          <div className={cls.card__info__box}>
            <div className={cls.info_item}>
              <span>Название</span>
              <p>{user?.name}</p>
            </div>
            <div className={cls.info_item}>
              <span>Адрес</span>
              <p>{user?.address}</p>
            </div>
            <div className={cls.info_item}>
              <span>Номер телефона</span>
              <p>{user?.phone}</p>
            </div>
            <div className={cls.info_item}>
              <span>Время работы</span>
              <p>{user?.work_time}</p>
            </div>
            <div className={cls.info_item}>
              <span>Ссылка</span>
              <p>{user?.name}</p>
            </div>
            <div className={cls.info_item}>
              <span>Описание</span>
              <p>{user?.description}</p>
            </div>
            <button onClick={handleLogout} className={cls.logout}>
              Выйти
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileComponent;
