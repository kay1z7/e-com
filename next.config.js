const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true,
  },
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET,
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  images: {
    domains: ["tanda-v1.s3.eu-north-1.amazonaws.com"], // Добавьте домен api.uno.kg в список разрешенных
  },
  // experimental: {
  //   reactRefresh: false, // Отключает React Refresh в продакшн окружении
  // },
};

module.exports = nextConfig;
