FROM node:16.18.1-bullseye-slim as build
RUN apt-get update && \
    apt-get install --no-install-recommends -y
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

FROM build
RUN yarn install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "./docker-entrypoint.sh" ]
