"use client";

import { useQuery } from "@apollo/client";

import Categories from "@/src/components/categories/Categories";
import Loader from "@/src/components/loader/Loader";
import DetailCard from "@/src/components/pages/product/DetailCard/DetailCard";
import { DETAIL_BARCODES_QUERY } from "@/src/lib/query/GetDetail";

const ProductDetails = ({ id }) => {
  const { data: detailData, loading } = useQuery(DETAIL_BARCODES_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Categories />
      <DetailCard card={detailData?.barcode} />
    </>
  );
};
export default ProductDetails;
