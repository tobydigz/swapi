FROM node:11.8.0-alpine
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*
RUN apk add yarn
RUN yarn global add pm2
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN yarn install
COPY /src /usr/src/app
COPY /config /usr/src/app/config
EXPOSE 8081
CMD [ "pm2-runtime", "start" ,"pm2.json"]
