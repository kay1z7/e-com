import { useEffect, useState } from "react";

import { search } from "@/src/api/api";

export default function useOption(str) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (str) {
      const getDate = async () => {
        const request = await search(str);
        setProduct(request.data);
      };
      getDate();
    }
  }, [str]);

  return product;
}
