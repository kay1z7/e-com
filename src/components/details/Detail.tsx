import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { instance } from "@/src/configs/Config";

import Loader from "../loader/Loader";
import cls from "./Detail.module.scss";

const Detail = ({ id, detailData }) => {
  const router = useRouter();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Текущий URL
  const currentUrl = router.asPath;
  // const detailData = Hooks.useDetails(id);
  const lines = detailData?.description.split("\n");

  // Создать элементы для каждой строки текста
  const renderedLines = lines.map((line, index) => <p key={index}>{line}</p>);

  const postToBasket = async () => {
    try {
      const resp = await instance.get(`/marketplace/barcodes/${id}/`);
      const sizeId = resp.data.category.sizes[0].id;

      const cart = localStorage.getItem("cart");
      const newCart = cart ? JSON.parse(cart) : [];
      if (!newCart.find((selected) => selected.id === id)) {
        newCart.push({ ...detailData, amount: 1, size_id: sizeId });
        setIsAddedToCart(true);
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>{detailData.title}</title>
        {/* <meta name="description" content={detailData.description} /> */}
        <meta name="keywords" content={detailData.keywords} />
      </Head>
      <div className={cls.about}>
        <div className={cls.about_leftSide}>
          <h1 className={cls.title}>{detailData?.title}</h1>
          <Image
            className={cls.about_leftSide_img}
            src={`${process.env.NEXT_IMAGES_URL}${detailData?.images && detailData?.images[0].file}`}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className={cls.about_rightSide}>
          <ul className={cls.aboutTheProduct}>
            <h3>Коротко о товаре</h3>
            <li>Способ установки</li>
            <li>Напряжение</li>
            <li>Питание</li>
            <li>Цвет</li>
            <li>Материал</li>
            <li>Высота</li>
            <li>Мощность</li>
            <li>Управление</li>
            <li>Особенности</li>
            <button>Подробнее</button>
          </ul>

          {!detailData && <Loader />}

          <div className={cls.about_rightSide_button}>
            <h2>{detailData?.selling_price} c</h2>
            <button onClick={postToBasket} disabled={isAddedToCart} className={cls.addToCartBtn}>
              {isAddedToCart ? "Добавлено в корзину" : "В корзину"}
            </button>

            <a
              href={`https://wa.me/708773883/?text= Здравствуйте, я Вам пишу с сайта tanda.kg http://tanda.kg/${currentUrl}`}
            >
              Получить консультацию
            </a>
          </div>
        </div>
      </div>
      {/* https://api.whatsapp.com/send?phone=708773883 */}
      <div className={cls.description}>
        <h4>Описание</h4>
        <p>{renderedLines}</p>
      </div>
    </>
  );
};

export default Detail;
