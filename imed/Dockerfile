FROM node:12

WORKDIR imed
COPY package*.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]
