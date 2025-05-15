FROM node:22.13.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --no-optional

COPY . .

EXPOSE 8186

RUN npm install -g serve

CMD npm run build && serve -s dist -l 8186
