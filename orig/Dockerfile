FROM node:12

WORKDIR orig
COPY package*.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]
