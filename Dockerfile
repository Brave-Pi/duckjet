FROM node:14.17.5
WORKDIR /app
COPY package-lock.json .
COPY package.json .
COPY app .
RUN npm install
ENTRYPOINT ["node","duck-jet"]