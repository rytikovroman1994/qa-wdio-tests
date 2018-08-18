FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk add --no-cache --virtual .build-deps curl python make g++

COPY package*.json /usr/src/app/

# install all dependencies (with devDeps)
RUN npm ci

# copy application code into container
COPY . /usr/src/app

ENV NODE_ENV=production \
  LOG_LEVEL=error

CMD [ "npm", "test" ]
