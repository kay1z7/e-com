"use client";

import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import { BARCODES_QUERY } from "@/src/lib/query/GetBarcodes";

import CardsWrapper from "../../cardsWrapper/CardsWrapper";
import Categories from "../../categories/Categories";
import Loader from "../../loader/Loader";
import css from "./Main.module.scss";

const Main = () => {
  const { data, loading, fetchMore } = useQuery(BARCODES_QUERY, {
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  const loadMoreItems = () => {
    fetchMore({
      variables: { offset: data?.barcodes.length },
      updateQuery(previousData, { fetchMoreResult, variables: { offset } }) {
        const updatedBarcode = previousData?.barcodes?.slice(0) || [];
        for (let i = 0; i < fetchMoreResult?.barcodes?.length; ++i) {
          updatedBarcode[offset + i] = fetchMoreResult?.barcodes[i];
        }
        return { ...previousData, barcodes: updatedBarcode };
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 400
      ) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Categories />
      <div className={css.main}>
        <div className={css.main_wrapper}>
          <CardsWrapper cards={data?.barcodes} title="Все товары в Tanda" />
        </div>
      </div>
    </>
  );
};

export default Main;
