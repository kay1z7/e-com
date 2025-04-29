import type { Metadata } from "next";

import ProductDetails from "@/src/components/pages/product/productDetails";
import { DETAIL_BARCODES_QUERY_FETCH } from "@/src/lib/query/GetDetail";

type Props = {
  params: {
    category: string;
    id: number;
    title: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, category, title } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}graphql/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: DETAIL_BARCODES_QUERY_FETCH,
      variables: { id },
    }),
  });

  const barcode = await res.json();
  const product = barcode?.data?.barcode;

  if (!product) {
    return {
      title: "Товар не найден - Tanda.kg",
      description: "Извините, но запрашиваемый товар не найден на сайте Tanda.kg.",
      robots: { index: false, follow: false }, // Запрещаем индексировать несуществующий товар
    };
  }

  const productTitle = product.title || "Товар";
  const productDescription =
    product.description && product.description.length > 120
      ? `${product.description.slice(0, 290)}...`
      : product.description ||
        "Купите этот товар в Tanda.kg по лучшей цене с бесплатной доставкой.";

  return {
    title: `${productTitle} – купить с бесплатной доставкой | Tanda.kg`,
    description: `${productDescription} Оформите заказ прямо сейчас и получите быструю доставку по всей стране.`,
    metadataBase: new URL("https://tanda.kg/"),
    alternates: {
      canonical: `https://tanda.kg/product/${id}/${category}/${title}`, // Канонический URL
    },
    openGraph: {
      title: `${productTitle} – заказать в Tanda.kg`,
      url: `https://tanda.kg/product/${id}/${category}/${title}`,
      description: `${productDescription} Покупайте с уверенностью на Tanda.kg!`,
      images: [
        `https://tanda-v1.s3.eu-north-1.amazonaws.com/${product.images?.[0]?.file || "default.jpg"}`,
      ],
      type: "website",
      siteName: "Tanda.kg",
      locale: "ru_RU",
    },
    twitter: {
      title: `${productTitle} – купить в Tanda.kg`,
      description: productDescription,
      card: "summary_large_image",
      images: [
        `https://tanda-v1.s3.eu-north-1.amazonaws.com/${product.images?.[0]?.file || "default.jpg"}`,
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: `${productTitle}, купить ${productTitle}, ${category} Tanda, лучшие цены на ${productTitle}, доставка ${productTitle}`,
  };
}

export default function Details({ params }: { params: { id: string } }) {
  return <ProductDetails id={params.id} />;
}
