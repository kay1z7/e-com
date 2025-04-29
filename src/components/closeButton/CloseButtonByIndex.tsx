import CloseIcon from "@/src/assets/icons/x.svg";

import closeStyles from "./CloseButtonByIndex.module.scss";

export const CloseButtonByIndex = ({ handle, index }) => {
  return (
    <button
      className={closeStyles.history_btn}
      onClick={() => {
        handle(index);
      }}
    >
      <CloseIcon />
    </button>
  );
};
