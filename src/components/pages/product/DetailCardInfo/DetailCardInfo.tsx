import { useRouter } from "next/navigation";
import type { Dispatch, FC, SetStateAction } from "react";
import React, { useEffect } from "react";

import CloseIcon from "@/src/assets/icons/closeIcon.svg";
import Button from "@/src/components/base/Button/Button";
import { useCart } from "@/src/Context/cartContext";

import css from "./DetailCardInfo.module.scss";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  card: any;
}

const DetailCardInfo: FC<Props> = ({ isOpen, card, setIsOpen }) => {
  const router = useRouter();
  const { setBuyNow, setToggleBuyNow } = useCart();
  const handleClose = () => setIsOpen(false);

  const handleBuyNow = () => {
    router.push("/basket/orderForm");
    setBuyNow({ ...card, amount: 1 });
    setToggleBuyNow(true);
  };
  useEffect(() => {}, [card]);

  const characteristics = card.characteristic ? JSON.parse(card.characteristic) : [];

  return (
    <div
      className={css.detail}
      style={{
        right: isOpen ? "0" : "-100%",
        background: isOpen ? "#00000055" : "none",
        opacity: isOpen ? "1" : "0",
      }}
    >
      <div className={css.detail_modal}>
        <div className={css.detail_modal_header}>
          <div className={css.detail_modal_header_close}>
            <p className={css.detail_modal_header_name}>Характеристики</p>
            <Button
              leftIcon={<CloseIcon />}
              onClick={handleClose}
              className={css.detail_modal_header_btn}
            />
          </div>
          <div className={css.detail_modal_blocks}>
            {characteristics?.characteristics?.map((item) => (
              <div className={css.detail_modal_block} key={item.key}>
                <p className={css.detail_modal_block_name}>{item.key}</p>
                <p className={css.detail_modal_block_descr}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
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
            // onClick={postToBasket}
            text="В корзину"
            variant="blue"
            // disabled={toggleBtn}
            className={css.detail_modal_footer_busket}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailCardInfo;
