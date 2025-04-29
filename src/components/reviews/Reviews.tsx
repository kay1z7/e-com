import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useQuery } from "@apollo/client";
import React, { useCallback, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import EditIcon from "@/src/assets/icons/editFileIcon.svg";
import GreyArrowRightIcon from "@/src/assets/icons/greyArrowRightIcon.svg";
import StarIcon from "@/src/assets/icons/starIcon.svg";
import { DETAIL_BARCODES_COMMENTS } from "@/src/lib/query/GetDetail";

import Button from "../base/Button/Button";
import SignUp from "../signUp/SignUp";
import ReviewCard from "./ReviewCard/ReviewCard";
import ReviewForm from "./ReviewForm/ReviewForm";
import css from "./Reviews.module.scss";

const Reviews = ({ barcodeId, reviewsQuantity, setReviewsQuantity }) => {
  const { data } = useQuery(DETAIL_BARCODES_COMMENTS, { variables: { id: barcodeId } });
  const [reviewsList, setReviewsList] = useState(data?.barcode?.comments || []);
  const [reviewForm, setReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(true);
  const sliderRef = useRef<SwiperRef>(null);
  const reversedReviewsList = [...reviewsList].reverse();
  const [authForm, setAuthForm] = useState(false);
  const addReviews = (newReview) => {
    setReviewsList([...reviewsList, newReview]);
    setReviewsQuantity((prev: number) => prev + 1);
  };

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  interface ReviewProps {
    id: string;
    comment: string;
    author: { firstName: string; lastName: string };
    createdAt: Date;
  }

  return (
    <div className={css.review}>
      <p className={css.review_title}>Отзывы</p>
      <div className={css.review_header}>
        <div className={css.review_header_stars}>
          <p className={css.review_header_count}>4.9</p>
          <div className={css.review_header_block_start}>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          <p className={css.review_header_count_text}>{`${reviewsQuantity} отзывов`}</p>
        </div>
        <Button
          onClick={() => {
            if (localStorage.getItem("key")) {
              setReviewForm(true);
            } else {
              setAuthForm(true);
            }
          }}
          text="Написать отзыв"
          leftIcon={<EditIcon />}
          className={css.review_header_edit}
        />
      </div>
      {showAllReviews ? (
        <div className={css.review_swiper}>
          {reviewsList?.length === 0 && (
            <div className={css.review_empty}>
              Еще нет отзывов. Будьте первым, кто оставит отзыв!
            </div>
          )}
          <Button
            variant="icon"
            leftIcon={<GreyArrowRightIcon />}
            onClick={handleNext}
            className={css.review_swiper_btn_next}
          />
          <Swiper
            ref={sliderRef}
            spaceBetween={20}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2.5,
              },
              400: {
                slidesPerView: 1.4,
              },
              0: {
                slidesPerView: 1,
              },
            }}
            loop
            freeMode
            modules={[Navigation]}
            className={css.review_swiper_wrapper}
          >
            {reversedReviewsList.slice(0, 5).map((review: ReviewProps) => (
              <SwiperSlide key={`swiper-review-${review?.id}`}>
                <ReviewCard
                  name={review?.author?.firstName}
                  date={review?.createdAt}
                  text={review?.comment}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            variant="icon"
            leftIcon={<GreyArrowRightIcon />}
            onClick={handlePrev}
            className={css.review_swiper_btn_prev}
          />
        </div>
      ) : (
        <div className={css.review_cards}>
          {reviewsList?.length === 0 && (
            <div className={css.review_empty}>
              Еще нет отзывов. Будьте первым, кто оставит отзыв!
            </div>
          )}
          {reversedReviewsList.map((review: ReviewProps) => (
            <div className={css.review_cards_card} key={`review-${review?.id}`}>
              <ReviewCard
                name={review?.author?.firstName}
                date={review?.createdAt}
                text={review?.comment}
              />
            </div>
          ))}
        </div>
      )}
      <Button
        onClick={() => setShowAllReviews(!showAllReviews)}
        className={css.review_all}
        text="Смотреть все отзывы"
        width="269px"
        variant="lightBlue"
      />
      {reviewForm && (
        <ReviewForm addReviews={addReviews} setReviewForm={setReviewForm} barcodeId={barcodeId} />
      )}
      {authForm && <SignUp onClose={() => setAuthForm(false)} />}
    </div>
  );
};

export default Reviews;
