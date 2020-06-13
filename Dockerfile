FROM node:12

WORKDIR /usr/src/backendapi 

COPY ./ ./ 

RUN npm install 

EXPOSE 3001

CMD [ "node", "./src/index.js", "npm", "test"]