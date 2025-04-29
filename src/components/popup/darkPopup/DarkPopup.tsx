import React from "react";

import css from "./DarkPopup.module.scss";

interface Props {
  topRight?: boolean;
  children: React.ReactNode;
}

const DarkPopup = ({ children, topRight }: Props) => {
  return (
    <div className={`${css.modal} ${topRight && css.modal_corner}`}>
      <div className={css.card}>{children}</div>
    </div>
  );
};

export default DarkPopup;
