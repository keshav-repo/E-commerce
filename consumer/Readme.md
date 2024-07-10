# test ES setup

```shell
docker run -p 127.0.0.1:9700:9200 -d --name testEs --network elastic-net \
  -e ELASTIC_PASSWORD=password@123 \
  -e "discovery.type=single-node" \
  -e "xpack.security.http.ssl.enabled=false" \
  -e "xpack.license.self_generated.type=trial" \
  docker.elastic.co/elasticsearch/elasticsearch:8.14.1
```
