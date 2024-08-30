FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4020
EXPOSE 4173

CMD ["yarn", "preview"]

