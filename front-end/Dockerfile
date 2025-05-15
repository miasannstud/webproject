FROM node:22.13.0-slim

WORKDIR /app

# COPY package*.json ./

# RUN npm install

# RUN npm install @rollup/rollup-linux-x64-gnu --no-save

COPY . .

RUN rm -rf node_modules package-lock.json
RUN npm install

EXPOSE 8186

# RUN npm install -g serve

CMD npm run build
