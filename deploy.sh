#!/bin/sh

docker compose -p react-slides up -d --build --force-recreate
docker image prune -f

cp ./nginx.react-slides.conf /var/local/proxy/conf.d/react-slides.conf
docker exec -it nginx_proxy nginx -s reload