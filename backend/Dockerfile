FROM node:21.6.1-slim

LABEL author="Group 6"
LABEL version="1.0.0"

EXPOSE 8080

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]