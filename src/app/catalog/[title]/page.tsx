import type { Metadata } from "next";

import CatalogPage from "@/src/components/pages/catalog/CatalogPage";

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const title = decodeURIComponent(params.title);
  return {
    title: `${title} | Каталог товаров | Tanda.kg`,
    description: `Изучите каталог товаров в категории "${title}" на Tanda.kg. Найдите лучшие предложения, скидки и новинки от ведущих брендов.`,
    metadataBase: new URL("https://tanda.kg/"),
    alternates: {
      canonical: `https://tanda.kg/catalog/${params.title}`,
    },
    openGraph: {
      title: `${title} | Каталог товаров | Tanda.kg`,
      description: `Ищете товары в категории "${title}"? Ознакомьтесь с полным ассортиментом на маркетплейсе Tanda.kg и выбирайте лучшее.`,
      url: `https://tanda.kg/catalog/${params.title}`,
      type: "website",
      siteName: "Tanda.kg",
      locale: "ru_RU",
    },
    twitter: {
      title: `${title} | Каталог товаров | Tanda.kg`,
      description: `Выбирайте товары из категории "${title}" на Tanda.kg. Большой ассортимент, выгодные цены и удобный поиск.`,
      card: "summary",
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: `${title}, каталог товаров, Tanda, лучшие цены, новинки, скидки, маркетплейс`,
  };
}

export default function Catalog({ params }: { params: { title: string } }) {
  const title = decodeURIComponent(params.title);
  return <CatalogPage title={title} />;
}
