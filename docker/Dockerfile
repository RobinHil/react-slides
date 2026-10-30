FROM dhi.io/node:26.12.1-alpine3.24-dev AS base
ENV CI=true
COPY package.json ./
RUN npm install --global "$(node -p "require('./package.json').packageManager")" && pnpm --version
RUN chown node:node /app
USER node

FROM base AS deps
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/home/node/.cache/pnpm,uid=1000,gid=1000 pnpm install --frozen-lockfile

FROM deps AS dev
COPY --chown=node:node . .
EXPOSE 5173
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

FROM deps AS build
ARG SITE_URL
COPY --chown=node:node . .
RUN pnpm build

FROM dhi.io/python:3.14-alpine3.24-dev AS docs
ENV PATH=/opt/zensical/bin:$PATH
COPY docs/requirements.txt /tmp/requirements.txt
RUN python -m venv /opt/zensical && pip install --no-cache-dir -r /tmp/requirements.txt
RUN mkdir /docs && chown nonroot:nonroot /docs
WORKDIR /docs
USER nonroot

FROM docs AS docs-dev
COPY --chown=nonroot:nonroot docs/ ./
EXPOSE 8000 8001
CMD ["sh", "-c", "SITE_URL=http://localhost/docs/fr/ zensical serve -f mkdocs.fr.yml -a 0.0.0.0:8001 & SITE_URL=http://localhost/docs/en/ exec zensical serve -f mkdocs.en.yml -a 0.0.0.0:8000"]

FROM docs AS docs-build
ARG SITE_URL
COPY --chown=nonroot:nonroot docs/ ./
RUN sh build.sh

FROM mcr.microsoft.com/playwright:v1.64.1-noble AS test
ENV CI=true PATH=/opt/node/bin:/opt/zensical/bin:$PATH
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl python3-venv xz-utils && rm -rf /var/lib/apt/lists/*
COPY .nvmrc package.json /tmp/
RUN version="$(cat /tmp/.nvmrc)" && arch="$(dpkg --print-architecture | sed s/amd64/x64/)" \
    && release="$(curl -fsSL https://nodejs.org/dist/index.json | node -p "JSON.parse(require('fs').readFileSync(0)).find((r) => r.version.startsWith('v${version#v}.') || r.version==='v${version#v}').version")" \
    && mkdir /opt/node && curl -fsSL "https://nodejs.org/dist/$release/node-$release-linux-$arch.tar.xz" | tar -xJ --strip-components=1 -C /opt/node \
    && npm install --global "$(node -p "require('/tmp/package.json').packageManager")" && node --version && pnpm --version
COPY docs/requirements.txt /tmp/requirements.txt
RUN python3 -m venv /opt/zensical && pip install --no-cache-dir -r /tmp/requirements.txt
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.cache/pnpm pnpm install --frozen-lockfile
CMD ["pnpm", "test"]

FROM dhi.io/nginx:1.30.6-alpine3.24 AS prod
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=docs-build /docs/site /usr/share/nginx/html/docs
EXPOSE 8080
