FROM node:14.18.1

WORKDIR /home/node/backend

COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]