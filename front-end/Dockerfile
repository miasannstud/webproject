FROM node:21.6.1-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --no-optional

COPY . .
RUN npm run build

RUN npm install -g serve

EXPOSE 8186

CMD ["serve", "-s", "dist", "-l", "8186"]
