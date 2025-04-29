import { useEffect, useState } from "react";

import { getProductsByCategories } from "@/src/api/api";

export default function useLayoutByCategory(id, limit) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getDate = async () => {
      const request = await getProductsByCategories(id, limit);
      setProduct(request.data);
    };
    getDate();
  }, [id, limit]);

  return product;
}
