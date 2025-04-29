import cls from "../Basket.module.scss";

const CartModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return <div className={cls.modal}></div>;
};

export default CartModal;
