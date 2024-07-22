FROM node:20

WORKDIR /app
RUN mkdir -p /app/dist

COPY package.json ./dist
COPY .env.development ./dist

RUN npm install

COPY dist ./dist

RUN npm run introspect:dev
RUN npm run generate:dev

EXPOSE 8080

CMD ["npm", "start"]
