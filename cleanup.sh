#!/bin/sh

docker compose -p react-slides down
docker image prune -f

rm /var/local/proxy/conf.d/react-slides.conf
docker exec -it nginx_proxy nginx -s reload