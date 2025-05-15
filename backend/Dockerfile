FROM node:22.13.0-slim

LABEL author="Group 6"
LABEL version="1.0.0"

EXPOSE 8286/tcp

RUN groupadd app-gr
RUN useradd -g app-gr usr

WORKDIR /app

# Copy everything into /app
COPY --chown=usr:app-gr . /app

# Switch into the backend folder for install
WORKDIR /app/backend

# RUN echo "Now in $(pwd), owner: $(whoami)"
RUN npm install --production

USER usr
CMD ["node", "server.js"]
