FROM node:24-alpine

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npm install -g @nestjs/cli
RUN npx prisma generate

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]