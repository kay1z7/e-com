import type { Metadata } from "next";

import About from "@/src/components/pages/about/About";

export const metadata: Metadata = {
  title: "О нас | Tanda.kg — Маркетплейс идеального выбора",
  description:
    "Откройте для себя Tanda.kg — маркетплейс, созданный для удобного и быстрого выбора товаров. Широкий ассортимент, удобный поиск и выгодные предложения ждут вас.",
  metadataBase: new URL("https://tanda.kg/"),
  alternates: {
    canonical: "https://tanda.kg/company/about",
  },
  openGraph: {
    title: "О нас | Tanda.kg — Маркетплейс идеального выбора",
    description:
      "Tanda.kg — это платформа, где каждый найдет товар по душе. Узнайте больше о нашем маркетплейсе, наших ценностях и преимуществах покупок с нами.",
    url: "https://tanda.kg/company/about",
    type: "website",
    siteName: "Tanda.kg",
    locale: "ru_RU",
  },
  twitter: {
    title: "О нас | Tanda.kg — Маркетплейс идеального выбора",
    description:
      "Узнайте больше о Tanda.kg — маркетплейсе, который делает покупки удобными, быстрыми и выгодными.",
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "о нас, Tanda, маркетплейс, выбор товаров, покупки онлайн, лучшие цены, удобный поиск",
};

export default function AboutPage() {
  return <About />;
}
