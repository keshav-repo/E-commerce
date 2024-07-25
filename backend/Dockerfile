FROM node:20.9.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "sh", "-c", "npm run introspect:dev && npm run generate:dev && npm run build && npm run seedEs && npm start" ]

EXPOSE 8080

CMD ["npm", "start"]
