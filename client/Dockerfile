FROM node:18-alpine as builder

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

ENV NODE_ENV production

RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000 

ENTRYPOINT ["node", ".output/server/index.mjs"]
