import type { Metadata } from "next";

import ClientLayout from "./ClientLayout";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const UA_ID = process.env.NEXT_PUBLIC_UA_ID;

export const metadata: Metadata = {
  title: "Добро пожаловать на Tanda: Место идеального выбора",
  metadataBase: new URL("https://tanda.kg/"),
  alternates: {
    canonical: "/",
  },
  description:
    "Tanda.kg — наслаждайтесь низкими ценами, выгодными предложениями и огромным ассортиментом. Покупки с нами — это удобно, быстро и выгодно!",
  openGraph: {
    title: "Tanda.kg маркетплейс - широкий обновляемый ассортимент",
    description:
      "Tanda.kg — наслаждайтесь низкими ценами, выгодными предложениями и огромным ассортиментом. Покупки с нами — это удобно, быстро и выгодно!",
    type: "website",
    siteName: "Tanda.kg маркетплейс",
    images: [
      {
        url: "https://tanda.kg/assets/images/og-image.png",
        width: 1440,
        height: 1024,
        alt: "Tanda.kg маркетплейс",
      },
    ],
    url: new URL("https://tanda.kg/"),
  },
  twitter: {
    title: "Tanda.kg - маркетплейс выгодных покупок",
    description:
      "Tanda.kg — наслаждайтесь низкими ценами, выгодными предложениями и огромным ассортиментом. Покупки с нами — это удобно, быстро и выгодно!",
    images: ["https://tanda.kg/assets/images/og-image.png"],
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />

        {/* Google Analytics (UA) */}
        {UA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${UA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${UA_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Google Analytics (GA4) */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {GTM_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');
                `,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
          </>
        )}
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
