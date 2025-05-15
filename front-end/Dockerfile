FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8186

# RUN npm install -g serve

CMD npm run build
