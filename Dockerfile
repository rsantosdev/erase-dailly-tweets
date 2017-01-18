FROM node:6-alpine

WORKDIR /src
ADD . .

ENV ACCESS_TOKEN "access_token"
ENV ACCESS_TOKEN_SECRET "access_token_secret"

RUN npm install

CMD ["node", "index.js"]