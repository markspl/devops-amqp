FROM node:12

WORKDIR obse
COPY package*.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]
