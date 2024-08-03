## E-commerce

### Start the apps using docker

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

1. Replace GOOGLE_AUTH_CLIENTID and GOOGLE_AUTH_SECRET with your google auth credentials.
2. Replace STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY with your stripe payment credentials.

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

#### Install all dependency in backend

```shell
cd backend
npm install
```

#### Seed ES

```shell
cd backend

npm run seedEs
```

#### Introspect and generate prisma using below command

```shell
npm run introspect:dev

npm run generate:dev
```

#### Run backend

```shell

npm run dev
```

#### Run frontend

```shell
npm run start
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
