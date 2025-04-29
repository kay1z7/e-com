import React from "react";

import css from "./Popup.module.scss";

const Popup = ({ children }) => {
  return (
    <div className={css.Popup}>
      <div className={css.Popup_content}>{children}</div>
    </div>
  );
};

export default Popup;
