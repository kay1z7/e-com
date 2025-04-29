/* eslint-disable no-await-in-loop */
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const sitemapGenerator = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://backend.tanda.kg/"; // Базовый URL API
  const Initlimit = 100; // Лимит на количество продуктов на запрос

  // Функция для получения всех продуктов с лимитом
  async function fetchAllProducts(url, limit) {
    let allProducts = [];
    let offset = 0;
    let hasMore = true;

    const nextUrl = `${url}graphql/`;

    const query = `
      query Barcodes($limit: Int, $offset: Int) {
        barcodes(limit: $limit, offset: $offset) {
          id
          title
          category {
            name
          }
        }
      }
    `;

    while (hasMore) {
      const response = await fetch(nextUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { limit, offset } }),
      });

      const data = await response.json();
      const products = data.data.barcodes;

      if (products.length > 0) {
        allProducts = allProducts.concat(products);
        offset += limit;
      } else {
        hasMore = false;
      }
    }

    return allProducts;
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayFormatted = formatDate(new Date());

  const products = await fetchAllProducts(apiUrl, Initlimit);

  const staticUrls = [
    `<url><loc>https://tanda.kg/</loc><lastmod>${todayFormatted}</lastmod></url>`,
    `<url><loc>https://tanda.kg/basket</loc><lastmod>${todayFormatted}</lastmod></url>`,
    `<url><loc>https://tanda.kg/company/about</loc><lastmod>${todayFormatted}</lastmod></url>`,
    `<url><loc>https://tanda.kg/company/contact</loc><lastmod>${todayFormatted}</lastmod></url>`,
    `<url><loc>https://tanda.kg/company/privacyPolicy</loc><lastmod>${todayFormatted}</lastmod></url>`,
  ];

  const productUrls = products
    .map(
      (product) =>
        `<url><loc>https://tanda.kg/product/${product.id}/${encodeURIComponent(
          product.category.name
        )}/${encodeURIComponent(product.title)}</loc><lastmod>${todayFormatted}</lastmod></url>`
    )
    .join("\n");

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticUrls.join(
    "\n"
  )}\n${productUrls}\n</urlset>`;

  const sitemapDir = "./public/sitemaps";
  const sitemapPath = path.join(sitemapDir, "sitemap.xml");

  // Проверяем и создаем директорию, если она не существует
  if (!fs.existsSync(sitemapDir)) {
    fs.mkdirSync(sitemapDir, { recursive: true });
  }

  fs.writeFileSync(sitemapPath, sitemapContent);

  console.log("Карта сайта успешно создана:", sitemapPath);

  // Обновление robots.txt
  const robotsTxtPath = "./public/robots.txt";
  const robotsContent = fs.existsSync(robotsTxtPath) ? fs.readFileSync(robotsTxtPath, "utf-8") : "";

  const sitemapDirective = `Sitemap: https://tanda.kg/sitemaps/sitemap.xml`;
  if (!robotsContent.includes(sitemapDirective)) {
    fs.writeFileSync(robotsTxtPath, `${robotsContent}\n${sitemapDirective}`.trim());
  }

  console.log("robots.txt обновлен.");
};

sitemapGenerator().catch((err) => console.error("Ошибка при генерации карты сайта:", err));
