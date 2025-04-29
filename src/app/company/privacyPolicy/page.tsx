import type { Metadata } from "next";

import PrivacyPolicy from "@/src/components/pages/privacyPolicy/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Tanda.kg",
  description:
    "Политика конфиденциальности Tanda.kg. Узнайте, как мы собираем, используем и защищаем ваши персональные данные. Мы гарантируем безопасность и защиту вашей информации.",
  metadataBase: new URL("https://tanda.kg/"),
  alternates: {
    canonical: "https://tanda.kg/company/privacyPolicy",
  },
  openGraph: {
    title: "Политика конфиденциальности | Tanda.kg",
    description:
      "Узнайте, как Tanda.kg обрабатывает ваши данные, какие меры безопасности применяет и как защищает вашу информацию. Мы ценим вашу конфиденциальность.",
    url: "https://tanda.kg/company/privacyPolicy",
    type: "article",
    siteName: "Tanda.kg",
    locale: "ru_RU",
  },
  twitter: {
    title: "Политика конфиденциальности | Tanda.kg",
    description:
      "Как Tanda.kg защищает ваши персональные данные? Читайте нашу политику конфиденциальности и будьте уверены в безопасности вашей информации.",
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords:
    "политика конфиденциальности, защита данных, персональные данные, безопасность данных, Tanda.kg",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
