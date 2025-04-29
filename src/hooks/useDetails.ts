import { useEffect, useState } from "react";

import { getDetails } from "@/src/api/api";

export default function useDetails(id) {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const request = await getDetails(id);
        setProduct(request?.data);
      };
      fetchData();
    }
  }, [id]);
  return product;
}
