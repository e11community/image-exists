ARG NODE_MAJOR_VERSION=22

FROM node:${NODE_MAJOR_VERSION}-slim

ENV ENV NPM_CONFIG_UPDATE_NOTIFIER=false

RUN \
  apt-get update && \
  apt-get install -y --no-install-recommends docker.io && \
  rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN \
  npm install --production --silent && \
  npm cache clean --force

COPY dist/ /
ENTRYPOINT ["node", "/main.js"]
