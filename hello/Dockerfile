FROM node:8-alpine
WORKDIR /code/src
COPY package.json .
RUN npm install
COPY . .
CMD [ "node", "hello.js" ]