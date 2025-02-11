FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM caddy:2-alpine

COPY --from=builder /app/dist /var/www/html

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]