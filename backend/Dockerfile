FROM node:21.6.1-slim

LABEL author="Group 6"
LABEL version="1.0.0"

EXPOSE 8286/tcp

RUN groupadd app-gr
RUN useradd -g app-gr usr

WORKDIR /app

# Copy only package.json and package-lock.json first
# COPY package.json package-lock.json ./

COPY --chown=usr:app-gr . /app

RUN npm install --production

USER usr

# COPY backend/ .

CMD ["node", "server.js"]
