"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

import css from "./Breadcrumbs.module.scss";

interface Props {
  lastName: string;
}

const Breadcrumbs: FC<Props> = ({ lastName = "lala" }) => {
  const pathname = usePathname();

  const decodedPath = decodeURIComponent(pathname);
  const pathArray = decodedPath.split("/").filter((path) => path);
  const filteredPathArray = pathArray.filter((path, index) => {
    if (path === "product") {
      return false;
    }
    if (!Number.isNaN(Number(path)) && index > 0) {
      return false;
    }
    return true;
  });

  const isProductPage = pathArray.includes("product");
  const finalPathArray = isProductPage ? filteredPathArray : pathArray;

  return (
    <nav className={css.breadcrumbs}>
      <Link href="/" className={css.breadcrumbs_link}>
        Главная{" "}
      </Link>
      {finalPathArray.map((path, index) => {
        const href = isProductPage
          ? `/catalog/${path}`
          : `/${finalPathArray.slice(0, index + 1).join("/")}`;
        const isLast = index === finalPathArray.length - 1;
        return isLast ? (
          <span key={href} className={css.breadcrumbs_last}>
            {" "}
            / {lastName}
          </span>
        ) : (
          <span>
            <Link href={href} className={css.breadcrumbs_link}>
              {`/${path}`}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
