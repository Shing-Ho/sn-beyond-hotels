FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --ignore-engines

COPY ./ ./

RUN ls

CMD yarn start

EXPOSE 3000