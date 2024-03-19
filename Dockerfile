FROM node:lts-iron
WORKDIR /usr/src/app
COPY scripts .
COPY artifacts .
COPY package.json .
COPY hardhat.config.ts .
RUN apt-get update && apt-get -y upgrade
RUN npm install && npm install typescript@4.7.4 -g && npm install ts-node@10.8.1 -g
RUN chown -R node /usr/src/app
USER node
CMD ["ts-node", "scripts/deploy.ts"]