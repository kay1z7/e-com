import { useState } from "react";

import ArrowBlackRight from "@/src/assets/icons/arrowBlackRight.svg";
import ArrowDown from "@/src/assets/icons/ArrowDown.svg";

import css from "./CategoriesList.module.scss";

const CategoriesListItem = ({ categoryId, categoryName, search, subCategories }) => {
  const [visibleSub, setVisibleSub] = useState(false);

  return (
    <div key={categoryId} className={css.mobileCategoriesBlock}>
      <p
        className={css.text}
        onClick={() => {
          search(categoryId, categoryName);
        }}
      >
        {categoryName}
      </p>
      <button
        className={css.subCategoriesBtn}
        onClick={() => {
          setVisibleSub(!visibleSub);
        }}
      >
        {!visibleSub ? <ArrowBlackRight /> : <ArrowDown />}
      </button>
      {subCategories && visibleSub && subCategories.length > 0 && (
        <ul className={css.subCategoriesList}>
          {subCategories.map(({ id, name }) => (
            <li
              key={id}
              onClick={() => {
                search(id, name);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesListItem;
