FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env.example ./.env

RUN npm install

COPY . .

EXPOSE 8000
CMD [ "node", "index.js" ]