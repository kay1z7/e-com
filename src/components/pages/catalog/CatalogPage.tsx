"use client";

import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import CardsWrapper from "@/src/components/cardsWrapper/CardsWrapper";
import Categories from "@/src/components/categories/Categories";
import Loader from "@/src/components/loader/Loader";
import NotFoundView from "@/src/components/NotFoundView/NotFoundView";
import { BARCODES_BY_CATEGORY } from "@/src/lib/query/GetBarcodes";

import searchStyles from "./catalog.module.scss";

const CatalogPage = ({ title }) => {
  const { data, loading, fetchMore } = useQuery(BARCODES_BY_CATEGORY, {
    variables: { name: title },
  });

  const loadMoreItems = () => {
    fetchMore({
      variables: { offset: data?.barcodes?.length },
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

  if (loading) return <Loader />;
  return (
    <>
      <Categories />
      <div className={searchStyles.main}>
        <div className={searchStyles.main_wrapper}>
          {data?.categories[0]?.barcodes?.length === 0 ? (
            <NotFoundView />
          ) : (
            <CardsWrapper cards={data?.categories[0]?.barcodes} title={title} />
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
