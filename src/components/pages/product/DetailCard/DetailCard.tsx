/* eslint-disable no-unsafe-optional-chaining */
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import React, { useEffect, useState } from "react";

import BasketBlueIcon from "@/src/assets/icons/basketBlueIcon.svg";
import DeliveryLogo from "@/src/assets/icons/elements.svg";
import GoldStarIcon from "@/src/assets/icons/goldStarIcon.svg";
import LogoCompanyIcon from "@/src/assets/icons/logoCompanyIcon.svg";
import { useCart } from "@/src/Context/cartContext";
import { BARCODES_QUERY } from "@/src/lib/query/GetBarcodes";

import Button from "../../../base/Button/Button";
import Breadcrumbs from "../../../breadcrumbs/Breadcrumbs";
import CardsWrapper from "../../../cardsWrapper/CardsWrapper";
import DialogComponent from "../../../Dialog/Dialog";
import Reviews from "../../../reviews/Reviews";
import DetailCardInfo from "../DetailCardInfo/DetailCardInfo";
import DetailSwiper from "../DetailSwiper/DetailSwiper";
import css from "./DetailCard.module.scss";
import CreditIcon from "@/src/assets/icons/cardTick.svg";
import CreditForm from "@/src/components/creditFlow/creditForm/CreditForm";

interface Props {
  card: any;
}

const DetailCard: FC<Props> = ({ card }) => {
  const router = useRouter();
  const { setBuyNow, setToggleBuyNow, cartItems, addToCart, isCredit, setIsCredit } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewsQuantity, setReviewsQuantity] = useState(card?.commentsQuantity || 0);

  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const handlenOpen = () => setIsOpen(true);

  const { data, fetchMore } = useQuery(BARCODES_QUERY, {
    variables: {
      categories: card?.category?.id,
      limit: 10,
      offset: 0,
    },
  });

  const loadMoreItems = () => {
    fetchMore({
      variables: { offset: data?.barcodes.length },
      updateQuery(previousData, { fetchMoreResult, variables: { offset } }) {
        const updatedBarcode = previousData?.barcodes?.slice(0) || [];
        for (let i = 0; i < fetchMoreResult?.barcodes?.length; ++i) {
          updatedBarcode[offset + i] = fetchMoreResult?.barcodes[i];
        }
        return { ...previousData, barcodes: updatedBarcode };
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 400
      ) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  const getCredit = () => {
    router.push(`/credit`);
  };

  const handleBuyNow = () => {
    router.push("/basket/orderForm");
    setBuyNow({ ...card, amount: 1 });
    setToggleBuyNow(true);
  };

  const postToBasket = () => {
    try {
      addToCart({ ...card, amount: 1 });
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
    setOpenDialog(true);
  };

  const characteristics = card?.characteristic ? JSON.parse(card?.characteristic) : [];

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    card?.description.length < 150 ? setIsDescriptionLong(false) : setIsDescriptionLong(true);
  }, []);

  const handleInstallment = () => {
    const currentUrl = window.location.href;
    const message = `Здравствуйте, я Вам пишу с сайта tanda.kg. Меня интересует оформление рассрочки на товар "${card.title}". Вот ссылка на товар: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/708773883/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  const handleCredit = () => {
    const currentUrl = window.location.href;
    const message = `Здравствуйте, я Вам пишу с сайта tanda.kg. Меня интересует оформление кредита на товар "${card.title}". Вот ссылка на товар: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/708773883/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  const characteristic = card;
  return (
    <div className={css.detail}>
      <DetailCardInfo isOpen={isOpen} card={characteristic} setIsOpen={setIsOpen} />
      <div className={css.detail_wrapper}>
        <Breadcrumbs lastName={card?.title} />
        <div className={css.detail_info}>
          <div className={css.detail_info_column}>
            <DetailSwiper card={card} />
            <div className={css.detail_info_descr}>
              <h1 className={css.detail_info_descr_name}>{card?.title}</h1>
              <div className={css.detail_info_descr_link}>
                <Link href={"#"} className={css.detail_info_descr_link_company}>
                  <LogoCompanyIcon />
                  Название магазина
                </Link>
                <p className={css.detail_info_descr_link_brend}>Бренд</p>
              </div>
              <div className={css.detail_info_descr_block}>
                <div className={css.detail_info_descr_block_star}>
                  <GoldStarIcon />
                  4.9
                </div>
                <p className={css.detail_info_descr_block_reviews}>{reviewsQuantity} отзывов</p>
              </div>
              <div className={css.detail_info_descr_detail}>
                <div className={css.detail_info_descr_detail_view}>
                  <h2>О товаре</h2>
                  <Button
                    className={css.detail_info_descr_detail_view_title}
                    text="Все характеристики"
                    onClick={handlenOpen}
                  />
                </div>
                {characteristics?.characteristics?.slice(0, 5).map((item) => (
                  <div className={css.detail_info_descr_detail_modal} key={item.key}>
                    <p className={css.detail_info_descr_detail_modal_name}>{item.key}</p>
                    <p className={css.detail_info_descr_detail_modal_descr}>{item.value}</p>
                  </div>
                ))}
                <p className={css.detail_info_descr_detail_title}>Описание</p>
                <h2 className={css.detail_info_descr_detail_descr}>
                  {!isDescriptionLong
                    ? card?.description
                    : isExpanded
                      ? card?.description
                      : `${card?.description.slice(0, 150)}...`}
                  {isDescriptionLong && (
                    <span onClick={() => setIsExpanded(!isExpanded)}>
                      {isExpanded ? " скрыть" : " еще"}
                    </span>
                  )}
                </h2>
              </div>
            </div>
          </div>
          {!isOpen && (
            <div className={css.detail_modal_footer}>
              <p className={css.detail_modal_footer_price}>
                {Number(card.discountedPrice)} сом <span>{Number(card.sellingPrice)} сом</span>
              </p>
              <Button
                onClick={handleBuyNow}
                text="Купить сейчас"
                variant="lightBlue"
                className={css.detail_modal_footer_buy}
              />
              <Button
                onClick={postToBasket}
                text="В корзину"
                variant="blue"
                disabled={cartItems.length !== 0 && cartItems.find((item) => item.id === card.id)}
                className={css.detail_modal_footer_busket}
              />
            </div>
          )}
          <div className={css.detail_info_btns_wrap}>
            <div className={css.detail_info_btns}>
              <p className={css.detail_info_btns_price}>
                {Math.ceil(+card?.discountedPrice)} сом
                <span className={css.detail_info_btns_price_line}>
                  {Math.ceil(+card?.sellingPrice)} сом
                </span>
              </p>
              <div className={css.detail_info_btns_block}>
                <Button
                  onClick={handleBuyNow}
                  width="100%"
                  variant="blue"
                  text="Купить сейчас"
                  className={css.detail_info_btns_block_icon}
                />
                <Button
                  onClick={postToBasket}
                  width="100%"
                  variant="lightBlue"
                  leftIcon={<BasketBlueIcon />}
                  text="Добавить в корзину"
                  className={css.detail_info_btns_block_icon}
                  disabled={cartItems.length !== 0 && cartItems.find((item) => item.id === card.id)}
                />
              </div>
            </div>
            <div className={css.detail_info_btns}>
              <div className={css.detail_info_btns_text}>
                <h3 className={css.detail_info_btns_text_green}>Выгодные условия</h3>
                <p>Если вам удобно, вы можете оформить этот товар в рассрочку или в кредит.</p>
              </div>
              <div className={css.detail_info_btns_block}>
                <Button
                  onClick={handleCredit}
                  width="100%"
                  leftIcon={<CreditIcon />}
                  variant="blue"
                  text='Оформить в кредит'
                  className={css.detail_info_btns_block_icon}
                />
                <Button
                  onClick={handleInstallment}
                  width="100%"
                  variant="lightBlue"
                  text="Оформить в рассрочку"
                  className={css.detail_info_btns_block_icon}
                />
              </div>
            </div>
            
            <div className={css.detail_info_btns_custom}>
              <DeliveryLogo />
              <p>
                Доставка по городу <span>бесплатно</span>
              </p>
            </div>
          </div>
        </div>
        <div className={css.detail__cards}>
          <Reviews
            barcodeId={card.id}
            reviewsQuantity={reviewsQuantity}
            setReviewsQuantity={setReviewsQuantity}
          />
          <CardsWrapper cards={data?.barcodes} title="Похожие товары" />
        </div>
        <DialogComponent setOpenDialog={setOpenDialog} open={openDialog} />
      </div>
      <CreditForm open={isCredit} card={card} />
    </div>
  );
};

export default DetailCard;
