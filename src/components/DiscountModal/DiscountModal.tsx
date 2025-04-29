import BackCircle from "@/src/assets/bg_circle.svg";
import MobileCircle from "@/src/assets/circleMobile.svg";
import Gift from "@/src/assets/gift.svg";
import MobileGift from "@/src/assets/mobileGift.svg";

import css from "./DiscountModal.module.scss";

const DiscountModal = ({ onClose }) => {
  return (
    <div className={css.toner} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.modal__deadline}>ДО 12 декабря 2024</div>
        <h1 className={css.modal__header}>Скидка!</h1>
        <p className={css.modal__title}>
          на весь ассортимент и кэшбек за каждую покупку! Начните экономить на подарках уже сегодня!
        </p>

        <button onClick={onClose} className={css.modal__btn}>
          Начать покупки
        </button>
        <BackCircle className={css.modal__circle} />
        <MobileCircle className={css.modal__mobile_circle} />
        <Gift className={css.modal__gift} />
        <MobileGift className={css.modal__mobile_gift} />
      </div>
    </div>
  );
};

export default DiscountModal;
