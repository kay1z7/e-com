import React from "react";
import { BounceLoader } from "react-spinners";

import css from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={css.loader}>
      <BounceLoader color="#1E90FF" loading />
    </div>
  );
};

export default Loader;
