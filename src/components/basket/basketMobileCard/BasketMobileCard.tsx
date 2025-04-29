import Image from "next/image";

import trashIcon from "@/src/assets/icons/trash.jpg";
import cls from "@/src/components/basket/Basket.module.scss";

const BasketMobileCard = ({ it, countDown, deleteFromCart, countUp }) => {
  return (
    <div className={cls.basketProductCardMobile}>
      <div className={cls.basketProductCardMobileInfoBox}>
        <div>
          <Image
            className={`${cls.productImage}`}
            width={158}
            height={158}
            src={`${`${"https://tanda-v1.s3.eu-north-1.amazonaws.com/"}${it?.images[0]?.file}`}`}
            alt="product picture"
          />
        </div>
        <div className={cls.basketProductCardMobileInfo}>
          <div className={`${cls.basketProductCardContentBox}`}>
            <p className={`${cls.productTitle}`}>{it?.title}</p>
            <p className={`${cls.productCategory}`}>Холодильник</p>
            <p className={`${cls.productRating}`}>
              5.0
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${cls.starIcon}`}
              >
                <path
                  d="M8.60354 3.31663C8.97037 2.57346 10.0301 2.57346 10.397 3.31663L11.5853 5.72409C11.7308 6.01894 12.012 6.2234 12.3374 6.27095L14.9965 6.65962C15.8164 6.77946 16.1432 7.7873 15.5496 8.36546L13.627 10.238C13.3912 10.4677 13.2835 10.7989 13.3392 11.1234L13.7927 13.7676C13.9328 14.5846 13.0752 15.2076 12.3416 14.8217L9.9657 13.5723C9.67431 13.419 9.32618 13.419 9.03479 13.5723L6.65888 14.8217C5.92525 15.2076 5.0677 14.5846 5.20782 13.7676L5.66133 11.1234C5.71699 10.7989 5.60933 10.4677 5.37346 10.238L3.45092 8.36546C2.85733 7.7873 3.18411 6.77946 4.00403 6.65962L6.66311 6.27095C6.98846 6.2234 7.26965 6.01894 7.41519 5.72409L8.60354 3.31663Z"
                  fill="#F8D25E"
                />
              </svg>
            </p>
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
            <p className={`${cls.quantity}`}>{it.amount || 0}</p>
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
        </div>
        <Image
          onClick={() => deleteFromCart(it)}
          className={`${cls.trashIcon}`}
          src={trashIcon}
          alt={"trashIcon"}
        />
      </div>
      <div className={`${cls.productPrice}`}>
        <p className={cls.productPriceMobile}>Цена:</p>
        <p>{(it?.discountedPrice ?? 0) * (it?.amount ?? 0).toLocaleString("ru-RU")} c</p>
        {/* <span>
            201 000
          </span> */}
      </div>
    </div>
  );
};

export default BasketMobileCard;
