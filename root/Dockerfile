FROM node:20-alpine

RUN mkdir app

WORKDIR /app

COPY ./package.json .

RUN yarn install

COPY ./ .

RUN yarn build

RUN npm i -g http-server

EXPOSE 9000
CMD [ "http-server", "dist" , "-p", "9000" ]
