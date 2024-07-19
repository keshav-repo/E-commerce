## Setup

### Docker Postgres setup

```shell
# 1. Run postgres sql and export
docker run --name postgres-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

#2. enter into postgres terminal
docker exec -it postgres-db /bin/bash

#3 connect to db
psql -h localhost -p 5432 -U postgres -d postgres

# Crate db
create database ecommerce;
```

### Elastic search db setup using docker

```shell
export ELASTIC_PASSWORD="password@123"
export KIBANA_PASSWORD="password@123"

docker network create elastic-net

docker run -p 127.0.0.1:9800:9200 -d --name elasticsearch --network elastic-net \
  -e ELASTIC_PASSWORD=$ELASTIC_PASSWORD \
  -e "discovery.type=single-node" \
  -e "xpack.security.http.ssl.enabled=false" \
  -e "xpack.license.self_generated.type=trial" \
  docker.elastic.co/elasticsearch/elasticsearch:8.14.1

```

### Kafka setup with single node

```shell
docker-compose -f kafka.setup.yml up

# enter into kafka 1 bash shell
docker exec -it kafka1 /bin/bash

# create order topic
kafka-topics --create --topic product --partitions 2 --replication-factor 2 --if-not-exists --bootstrap-server localhost:9092

# consume product topic
kafka-console-consumer --topic product --from-beginning --bootstrap-server localhost:29092

```

# prisma

```shell
dotenv -e .env.development -- npx prisma introspect

npm run introspect:dev


```

### Credit card for Test payment

4242424242424242

### Trigger Stripe webhook call from localhost

```shell
stripe listen --forward-to localhost:8080/api/payment/webhook
```
