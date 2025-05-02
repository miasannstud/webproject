# FROM <baseImg> as <intermImg>
FROM node:21.6.1-slim

# LABEL <key=value>
LABEL author="Group 6"
LABEL version="1.0.0"

# EXPOSE <port/protocol>, something about port
EXPOSE 8080

# mulig ENV <key=value>

# WORKDIR <dir>
WORKDIR /app

# COPY <source> <destination>
# copies everything, except what's specified in .dockerignore
COPY . .

# USER <username>
# runs commands in an image as the specified user (better to avoid 'root', which is used by default)
# USER 

# RUN <command all parts>
# for importing dependencies, compiling code, running tasks...
RUN npm install

# CMD <command>
CMD ["npm", "start"]
