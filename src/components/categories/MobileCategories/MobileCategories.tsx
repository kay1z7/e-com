import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Dispatch, FC, SetStateAction } from "react";

import CloseIcon from "@/src/assets/icons/closeIcon.svg";
import Button from "@/src/components/base/Button/Button";
import MobileCategoriesListItem from "@/src/components/categories/MobileCategories/MobileCategoriesList/CategoriesList";
import { searchInputVar, selectInputVar } from "@/src/lib/apolloClient";
import { CATEGORIES_QUERY } from "@/src/lib/query/Categories";

import { linksCategories } from "../Categories";
import css from "./MobileCategories.module.scss";

interface Props {
  isVisibleCategories: boolean;
  setIsVisibleCategories: Dispatch<SetStateAction<boolean>>;
}

const MobileCategories: FC<Props> = ({ isVisibleCategories, setIsVisibleCategories }) => {
  const route = useRouter();

  const search = (id: string, name: string) => {
    searchInputVar("");
    localStorage.removeItem("inputValue");
    localStorage.setItem("selectValue", JSON.stringify(id));
    selectInputVar(id);
    setIsVisibleCategories(false);
    route.push(`/catalog/${name}`);
  };

  const { data } = useQuery(CATEGORIES_QUERY);
  return (
    <div
      className={css.mobileCategories}
      style={{
        left: !isVisibleCategories ? "200%" : "-20px",
      }}
    >
      <div className={css.mobileCategories_block}>
        <p className={css.mobileCategories_block_title}>Все категории</p>
        <Button
          className={css.mobileCategories_block_btn}
          leftIcon={<CloseIcon />}
          variant="icon"
          onClick={() => setIsVisibleCategories(false)}
        />
      </div>
      <div className={css.mobileCategories_blocks}>
        <div className={css.mobileCategories_blocks_categories}>
          {data?.categories.map(({ id, name, children }) => (
            <MobileCategoriesListItem
              key={id}
              categoryId={id}
              categoryName={name}
              search={search}
              subCategories={children}
            />
          ))}
        </div>
        <div className={css.mobileCategories_blocks_links}>
          {linksCategories.map((item, index) => (
            <Link
              key={`${item.label}-link-${index}`}
              href={item.link}
              onClick={() => {
                setIsVisibleCategories(false);
              }}
              className={css.mobileCategories_blocks_links_text}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileCategories;
