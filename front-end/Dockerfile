FROM node:20-slim

WORKDIR /app

RUN npm install @rollup/rollup-linux-x64-gnu

COPY . .

RUN npm install


EXPOSE 8186

RUN npm install -g serve

CMD npm run build && serve -s dist -l 8186
