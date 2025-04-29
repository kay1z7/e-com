import React from "react";

import Breadcrumbs from "../../breadcrumbs/Breadcrumbs";
import Categories from "../../categories/Categories";
import css from "./InfoBlock.module.scss";

interface InfoBlockProps {
  children: React.ReactNode;
  breadCrumbs?: string;
}

const InfoBlock = ({ children, breadCrumbs }: InfoBlockProps) => {
  return (
    <div>
      <Categories />
      <div className={css.block}>{breadCrumbs && <Breadcrumbs lastName={breadCrumbs || ""} />}</div>
      <div className={css.info_block}>
        <div className={css.info_block_wrapper}>{children}</div>
      </div>
    </div>
  );
};

export default InfoBlock;
