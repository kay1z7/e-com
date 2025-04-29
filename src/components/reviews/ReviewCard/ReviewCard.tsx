import React from "react";

import StarIcon from "@/src/assets/icons/starIcon.svg";
import ProfileIconUnknown from "@/src/assets/icons/unknown.svg";

import Button from "../../base/Button/Button";
import css from "./ReviewCard.module.scss";

const ReviewCard = ({ name, date, text }) => {
  const formatDate = (dateString: string) => {
    const currentDate = new Date(dateString);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };
  return (
    <div className={css.review_card}>
      <div className={css.review_card_header}>
        <div className={css.review_card_info}>
          <ProfileIconUnknown />
          <div className={css.review_card_info_user}>
            <p className={css.review_card_info_name}>{name}</p>
            <p className={css.review_card_info_date}>{formatDate(date)}</p>
          </div>
        </div>
        <div className={css.review_card_info_stars}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
      </div>
      <p className={css.review_card_descr}>{text}</p>
      <Button text="Пожаловаться на отзыв" className={css.review_card_btn} />
    </div>
  );
};

export default ReviewCard;
