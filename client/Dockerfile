FROM node:20-alpine as builder

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

ENV NODE_ENV production
ENV BASE_URL=http://api:5000
RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000 

ENTRYPOINT ["node", ".output/server/index.mjs"]
