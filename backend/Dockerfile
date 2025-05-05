FROM node:21.6.1-slim

LABEL author="Group 6"
LABEL version="1.0.0"

EXPOSE 8080

WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package.json package-lock.json ./

RUN npm install

COPY backend/ .

CMD ["npm", "start"]
