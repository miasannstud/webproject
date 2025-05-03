FROM node:21.6.1-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]