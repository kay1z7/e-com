FROM node:18-alpine

RUN apk add --no-cache yarn

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn build
RUN node sitemap.js

EXPOSE 3000

CMD ["yarn", "start"]
