import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC, useEffect, useState } from "react";

import BasketBlueIcon from "@/src/assets/icons/basketBlueIcon.svg";
import BasketWhiteIcon from "@/src/assets/icons/basketWhiteIcon.svg";
import StarIcon from "@/src/assets/icons/starIcon.svg";
import { useCart } from "@/src/Context/cartContext";

import Button from "../base/Button/Button";
import DialogComponent from "../Dialog/Dialog";
import css from "./Card.module.scss";

interface Props {
  item: any;
}

const Card: FC<Props> = ({ item }) => {
  const router = useRouter();
  const { cartItems, addToCart, setBuyNow, setToggleBuyNow } = useCart();
  const findCart = cartItems.find((selected) => selected.id === item.id);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    const isCartEmpty = cartItems.length === 0;
    const isDisabled = isCartEmpty || cartItems.some((prod) => prod.shop_id === item.shop_id);
    setToggleBtn(findCart?.amount || !isDisabled);
  }, [findCart, item.shop_id, cartItems]);

  const postToBasket = async () => {
    try {
      addToCart({ ...item, amount: 1 });
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
    setOpenDialog(true);
  };

  const postToBuyNow = () => {
    router.push("/basket/orderForm");
    setBuyNow({ ...item, amount: 1 });
    setToggleBuyNow(true);
  };

  return (
    <div className={css.card}>
      <Link
        href={`/product/${item?.id}/${item?.category?.name}/${encodeURIComponent(`${item?.title}`)}`}
        className={css.card_link}
      >
        <div className={css.card_background}>
          <Image
            width={310}
            height={310}
            src={
              item?.images?.[0]?.file
                ? `${"https://tanda-v1.s3.eu-north-1.amazonaws.com/"}${item.images[0].file}`
                : ""
            }
            alt={item?.title}
            className={css.card_img}
          />
        </div>
        <div className={css.card_info}>
          <p className={css.card_name}>{item?.title}</p>
          <p className={css.card_category}>{item?.category?.name}</p>
          <div className={css.card_stars}>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <p className={css.card_stars_text}>{`${item?.commentsQuantity} отзывов`}</p>
          </div>
          <p className={css.card_price}>{`${Math.trunc(item?.discountedPrice)
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сом`}</p>
        </div>
      </Link>
      <Button
        onClick={postToBuyNow}
        text="Купить сейчас"
        variant="blue"
        className={css.card_buy_now}
        width="100%"
      />
      <Button
        onClick={postToBasket}
        text="Добавить в корзину"
        leftIcon={!toggleBtn ? <BasketBlueIcon /> : <BasketWhiteIcon />}
        className={css.card_backet}
        width="100%"
        disabled={toggleBtn}
      />
      <DialogComponent setOpenDialog={setOpenDialog} open={openDialog} />
    </div>
  );
};

export default Card;
