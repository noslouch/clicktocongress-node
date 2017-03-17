FROM node:7.7-alpine
RUN npm install -g mocha
COPY . /code
RUN chown -R node: /code
WORKDIR /code
USER node
RUN npm install && touch .env
CMD ["node", "index.js"]
