FROM node:20.9.0-alpine

RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

ENTRYPOINT [ "sh", "-c", "npm run build && npm run start"]
