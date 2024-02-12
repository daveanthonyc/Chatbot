FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV BOT_TOKEN="6810647733:AAEQ4nDfGRf3RhrwzrgZJI33Stmi7Dz1r_s"

CMD node index.js 

CMD [ "npm", "start"]
