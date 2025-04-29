import { useState } from "react";

import css from "./CardCategories.module.scss";

const CardCategories = ({ categories, selectCategory }) => {
  const [isModalVisibleItem, setIsModalVisibleItem] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className={css.category_modal} onMouseLeave={() => setIsModalVisibleItem(false)}>
      <div className={css.category_modal_first}>
        {categories &&
          categories.map(({ id, name }, i: number) => (
            <p
              key={id}
              className={css.category_modal_first_text}
              onMouseEnter={() => {
                setIsModalVisibleItem(true);
                setIndex(i);
              }}
              onClick={() => {
                selectCategory(id, name);
              }}
            >
              {name}
            </p>
          ))}
      </div>
      {isModalVisibleItem && categories[index].children && (
        <div className={css.category_modal_first}>
          <p className={css.category_modal_first_title}>{categories[index].name}</p>
          {categories[index].children.map(({ id, name }) => (
            <p
              onClick={() => {
                selectCategory(id, name);
              }}
              key={id}
              className={css.category_modal_first_text}
            >
              {name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardCategories;
