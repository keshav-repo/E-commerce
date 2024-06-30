## Setup

```shell
# 1. Run postgres sql and export
docker run --name postgres-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

#2. enter into postgres terminal
docker exec -it postgres-db /bin/bash

#3 connect to db
psql -h localhost -p 5432 -U postgres -d postgres

```
