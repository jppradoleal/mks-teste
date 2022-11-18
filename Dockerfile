FROM node:16.18.1 as build
RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    wait-for-it
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "./docker-entrypoint.sh" ]
