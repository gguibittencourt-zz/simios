FROM node:10.13.0

ENV NPM_CONFIG_LOGLEVEL=error

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000 9233

CMD npm run migrate-db-dev && npm run local
