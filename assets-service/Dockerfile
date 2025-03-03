FROM node:22.13-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm i -g @nestjs/cli

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main.js"]
