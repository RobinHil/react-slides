FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM caddy:2.11.4-alpine

# Sans ce COPY, l'image seule demarre sur la page d'accueil par defaut de Caddy :
# le Caddyfile n'arrivait que par le volume de docker-compose, donc tout
# deploiement construit a partir du seul Dockerfile ne servait pas l'application.
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /var/www/html

# Le conteneur ne tourne pas en root. Caddy ecrit dans /data et /config :
# ces repertoires doivent appartenir a l'utilisateur avant le changement,
# sinon un volume monte dessus heriterait de root et le demarrage echouerait.
RUN addgroup -g 1000 -S caddy2 \
 && adduser -u 1000 -S -G caddy2 caddy2 \
 && mkdir -p /data /config \
 && chown -R caddy2:caddy2 /data /config

USER caddy2

# Port non privilegie : un processus sans root ne peut pas se lier sous 1024.
EXPOSE 8080

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]