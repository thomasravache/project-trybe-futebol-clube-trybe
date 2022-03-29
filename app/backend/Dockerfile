FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY packages.npm ./
RUN npm install

COPY . ./

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]