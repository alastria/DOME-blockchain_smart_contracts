FROM node:lts-iron
WORKDIR /usr/src/app
COPY scripts scripts 
COPY hardhatRun.sh .
COPY package.json . 
COPY hardhat.config.ts . 
COPY contracts contracts 
COPY test test 
COPY tsconfig.json .
RUN apt-get update && apt-get -y upgrade
RUN npm install && npm install typescript@4.7.4 -g && npm install ts-node@10.8.1 -g
CMD ["./hardhatRun.sh"]