import Image from "next/image";

import trashIcon from "@/src/assets/icons/trash.svg";
import cls from "@/src/components/basket/Basket.module.scss";

const BasketProductCard = ({ it, countDown, deleteFromCart, countUp }: any) => {
  return (
    <div className={`${cls.basketProductCard}`}>
      <div className={`${cls.basketProductCard_imageBox}`}>
        {/* <input type="checkbox" name="" id="" /> */}
        <div className={`${cls.basketProductCard_ImageBox_image}`}>
          <Image
            className={`${cls.productImage}`}
            width={300}
            height={300}
            src={`${"https://tanda-v1.s3.eu-north-1.amazonaws.com/"}${it?.images[0]?.file}`}
            alt="product picture"
          />
        </div>
        <div className={`${cls.basketProductCardContentBox}`}>
          <p className={`${cls.productTitle}`}>{it?.title}</p>
          <p className={`${cls.productCategory}`}>{it.category.name}</p>
        </div>
      </div>
      <div className={`${cls.buttonsContainer}`}>
        <button className={`${cls.addButton}`} onClick={() => countDown(it)}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 12.5H19.5"
              stroke="#181818"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className={`${cls.quantity}`}>{it?.amount}</p>
        <button className={`${cls.subtractButton}`} onClick={() => countUp(it)}>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5.5V19.5"
              stroke="#181818"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 12.5H19"
              stroke="#181818"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className={`${cls.priceContainer}`}>
        <p className={`${cls.productPrice}`}>
          <span>{it.sellingPrice * (it?.amount ?? 0)}</span>
          {(it?.discountedPrice ?? 0) * (it?.amount ?? 0)} cом
        </p>{" "}
        <div className={`${cls.trashIcon}`}>
          <div onClick={() => deleteFromCart(it)}>{trashIcon()}</div>
          {/* <Image src={trashIcon} alt={"trashIcon"} /> */}
        </div>
      </div>
    </div>
  );
};

export default BasketProductCard;
