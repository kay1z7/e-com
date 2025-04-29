import type { Metadata } from "next";

import SearchPageComponent from "@/src/components/pages/search/SearchPageComponent";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { search?: string };
}): Promise<Metadata> {
  const search = searchParams?.search || "Поиск";

  const searchQuery = encodeURIComponent(search);

  return {
    title: `${search} - Результаты поиска | TANDA`,
    description: `Найдите "${search}" среди товаров в TANDA по лучшим ценам. Мы предлагаем широкий ассортимент товаров, от электроники до одежды, с удобной доставкой и гарантией качества. Исследуйте все возможные варианты и найдите то, что идеально соответствует вашим потребностям.`,
    metadataBase: new URL("https://tanda.kg/"),
    alternates: {
      canonical: `https://tanda.kg/search?search=${searchQuery}`,
    },
    openGraph: {
      title: `Результаты поиска по "${search}" | TANDA`,
      description: `Смотрите предложения по запросу "${search}" на маркетплейсе TANDA. У нас вы найдете товары по лучшим ценам с гарантией качества и быстрой доставкой.`,
      url: `https://tanda.kg/search?search=${searchQuery}`,
      type: "website",
      images: ["https://tanda.kg/images/og-image.jpg"],
      locale: "ru_RU",
      siteName: "TANDA",
    },
    twitter: {
      title: `${search} - Результаты поиска | TANDA`,
      description: `Найдите "${search}" среди товаров в TANDA по лучшим ценам. Смотрите наши предложения и выбирайте товары, которые подходят именно вам.`,
      card: "summary_large_image",
      images: ["https://tanda.kg/images/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: `${search}, TANDA, товары, маркетплейс, купить ${search}, цены ${search}`,
  };
}

export default function Page() {
  return <SearchPageComponent />;
}
