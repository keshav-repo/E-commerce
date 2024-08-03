## E-commerce

Welcome to my nodejs nextjs product which is built on following technology.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Google Auth](https://img.shields.io/badge/Google_Auth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)

Below are main feature of this project.

1. This is a monolithic project which can split into multiple microservices based on requirement. As each service layer is independent of each other, we can easily migrate to microservice architecture.
2. Server side rendering is done using nextjs which will help in Search engine optimisation.
3. By using elastic search, we can enhance search capability which is required in big project. Elastic search gives fuzzy search capability in real time.
4. Kafka is used in places to communicate between two microservices which do not need to interact in real time. In current implementation, there is api to add a product. After product is added, a event is added. There is a seperate consumer which consumes the event and stores in elastic search.

### Start the whole apps in a single docker command

```shell
docker compose -p ecommerce  up -d
```

### Setup for Local development

#### Start essential service ( Postgres, Kafka, Elastic db )

```shell
docker compose -f essentialService.yml  up
```

#### Do install nodejs >=20

#### Replace .env.development file with below content

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=mysecretpassword
DB_NAME=ecommerce

ES_HOST=http://localhost:9800
ES_USERNAME=elastic
ES_PASSWORD=password@123

USER_AUTH_KEYS=some-key

BROKERS=localhost:9092

GOOGLE_AUTH_CLIENTID=
GOOGLE_AUTH_SECRET=

PORT=8080
TOKEN_AGE_IN_MS=3600000

REFRESH_TOKEN_EXPIRY=7d
ACCESS_TOKEN_EXPIRY=1h

DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/ecommerce?schema=public&connection_limit=5&pool_timeout=30"

STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

STRIPE_SUCCESS_URL=http://localhost:3000/success
STRIPE_CANCEL_URL=http://localhost:3000/cancel
```

1. Replace GOOGLE_AUTH_CLIENTID and GOOGLE_AUTH_SECRET with your google auth credentials.
2. Replace STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY with your stripe payment credentials.

#### Install all dependency in backend

```shell
cd backend
npm install
```

#### Seed ES

```shell
npm run seedEs
```

#### Introspect and generate prisma client using below command

```shell
npm run introspect:dev

npm run generate:dev
```

#### Run backend

```shell
npm run dev
```

#### If you have added stripe account, add following to trigger stripe webhook

```shell
# below command take you to stripe page for authentication.
stripe login

stripe listen --forward-to localhost:8080/api/payment/webhook
```

#### Replace .env file with below content for frontend

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
BACKEND_HOST=http://localhost:8080
NODE_ENV=test
```

1. Replace enpty value in NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY with your stripe payment published key

#### Replace destination in `frontend/next.config.js` file with below

```
 destination: 'http://localhost:8080/api/:path*'
```

#### Install dependency in frontend

```shell
cd ../frontend

npm install
```

#### Run frontend

```shell
npm run dev
```
