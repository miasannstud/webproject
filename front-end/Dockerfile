FROM node:20-slim

WORKDIR /app

COPY . .

RUN npm install


EXPOSE 8186

RUN npm install -g serve

CMD npm run build && serve -s dist -l 8186

# FROM node:20-slim

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install --no-optional

# COPY . .
# RUN npm run build

# RUN npm prune --production

# RUN npm install -g serve

# EXPOSE 8186

# CMD ["serve", "-s", "dist", "-l", "8186"]