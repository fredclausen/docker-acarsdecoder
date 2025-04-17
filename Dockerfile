FROM node:23.11.0-bookworm-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# hadolint ignore=DL3008,DL3003,SC1091
#RUN apt-get update && \
#    apt-get install -y --no-install-recommends openssl && \
#    rm -rf /var/lib/apt/lists/*

WORKDIR /home/node/app

COPY package*.json ./
COPY --chown=node:node . .
USER node
RUN npm install

ENV \
  LOG_LEVEL=info \
  PORT=3000
CMD [ "npm", "run", "start"]
