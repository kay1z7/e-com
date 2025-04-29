import type { Metadata } from "next";

import Contact from "@/src/components/pages/contact/Contact";

export const metadata: Metadata = {
  title: "Контакты | Tanda.kg",
  description:
    "Свяжитесь с нами! Получите консультацию, поддержку и ответы на вопросы от команды Tanda.kg. Мы всегда готовы помочь вам в любое время.",
  metadataBase: new URL("https://tanda.kg/"),
  alternates: {
    canonical: "https://tanda.kg/company/contact",
  },
  openGraph: {
    title: "Контакты | Tanda.kg",
    description:
      "Свяжитесь с нами для консультации, поддержки и сотрудничества. Мы готовы ответить на ваши вопросы и помочь вам.",
    url: "https://tanda.kg/company/contact",
    type: "website",
    siteName: "Tanda.kg",
    locale: "ru_RU",
  },
  twitter: {
    title: "Контакты | Tanda.kg",
    description:
      "Хотите узнать больше? Напишите нам, и мы ответим на все ваши вопросы! Tanda.kg – всегда на связи.",
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: "контакты, обратная связь, поддержка, консультация, Tanda.kg, телефон, email",
};

export default function ContactPage() {
  return <Contact />;
}
