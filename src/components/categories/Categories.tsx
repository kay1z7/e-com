"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import MenuIcon from "@/src/assets/icons/menuIcon.svg";
import { searchInputVar, selectInputVar } from "@/src/lib/apolloClient";
import { CATEGORIES_QUERY } from "@/src/lib/query/Categories";

import CardCategories from "./CardCategories/CardCategories";
import css from "./Categories.module.scss";

export const linksCategories = [
  { label: "О нас", link: "/company/about" },
  { label: "Контакты", link: "/company/contact" },
];

const Categories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const select = JSON.parse(`${localStorage.getItem("selectValue")}`);
    selectInputVar(select);
  }, []);

  const { data } = useQuery(CATEGORIES_QUERY);

  const selectCategory = (id: string, name: string) => {
    searchInputVar("");
    localStorage.removeItem("inputValue");
    localStorage.setItem("selectValue", JSON.stringify(id));
    selectInputVar(id);
    setIsModalVisible(false);
    route.push(`/catalog/${name}`);
  };

  return (
    <div className={css.categories}>
      <div className={css.categories_wrapper}>
        <div className={css.categories_wrapper_length}>
          <div
            className={css.categories_wrapper_list}
            onMouseEnter={() => setIsModalVisible(true)}
            onMouseLeave={() => setIsModalVisible(false)}
          >
            <MenuIcon className={css.categories_wrapper_icon} />
            <p className={css.categories_wrapper_text}>Все категории</p>
            {isModalVisible && (
              <CardCategories categories={data?.categories} selectCategory={selectCategory} />
            )}
          </div>
          {linksCategories.map((item, index) => (
            <Link
              key={`${item.label}-link-${index}`}
              href={item.link}
              className={css.categories_wrapper_link}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
