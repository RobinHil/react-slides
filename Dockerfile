FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM caddy:2-alpine

# Sans ce COPY, l'image seule demarre sur la page d'accueil par defaut de Caddy :
# le Caddyfile n'arrivait que par le volume de docker-compose, donc tout
# deploiement construit a partir du seul Dockerfile ne servait pas l'application.
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /var/www/html

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]