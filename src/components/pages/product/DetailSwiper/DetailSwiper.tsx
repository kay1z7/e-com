import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";

import WhiteArrowBottomIcon from "@/src/assets/icons/whiteArrowBottom.svg";
import Button from "@/src/components/base/Button/Button";

import css from "./DetailSwiper.module.scss";

const DetailSwiper = ({ card }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const sliderRef = useRef<SwiperRef>(null);
  const sliderRefMain = useRef<SwiperRef>(null);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNextMain = useCallback(() => {
    if (!sliderRefMain.current) return;
    sliderRefMain.current.swiper.slideNext();
  }, []);

  const handlePrevMain = useCallback(() => {
    if (!sliderRefMain.current) return;
    sliderRefMain.current.swiper.slidePrev();
  }, []);

  return (
    <div className={css.detail_info_imgs}>
      <div className={css.detail_info_imgs_column}>
        <Button
          variant="icon"
          leftIcon={<WhiteArrowBottomIcon />}
          onClick={handlePrev}
          className={css.detail_info_imgs_btn_next}
        />
        <Swiper
          ref={sliderRef}
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          loop
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          direction={"vertical"}
          className={css.detail_info_imgs_swiper_vertical}
        >
          {card?.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                width={82}
                height={116}
                alt={card?.title}
                src={`${"https://tanda-v1.s3.eu-north-1.amazonaws.com/"}${image.file}`}
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          variant="icon"
          leftIcon={<WhiteArrowBottomIcon />}
          onClick={handleNext}
          className={css.detail_info_imgs_btn_prev}
        />
      </div>
      <div className={css.detail_info_imgs_main}>
        {card?.images?.length > 1 && (
          <Button
            variant="icon"
            leftIcon={<WhiteArrowBottomIcon />}
            onClick={handlePrevMain}
            className={css.detail_info_imgs_main_btn_next}
          />
        )}
        {card?.images?.length > 1 && (
          <Button
            variant="icon"
            leftIcon={<WhiteArrowBottomIcon />}
            onClick={handleNextMain}
            className={css.detail_info_imgs_main_btn_prev}
          />
        )}
        <Swiper
          loop={true}
          spaceBetween={30}
          ref={sliderRefMain}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={css.detail_info_imgs_card}
        >
          {card?.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                width={386}
                height={100}
                alt={card?.title}
                src={`${"https://tanda-v1.s3.eu-north-1.amazonaws.com/"}${image.file}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DetailSwiper;
