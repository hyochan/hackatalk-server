FROM node:10.16.0

ENV NODE_ENV=test

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN npm install -g yarn
RUN yarn

COPY . /app

CMD [ "yarn", "start" ]
