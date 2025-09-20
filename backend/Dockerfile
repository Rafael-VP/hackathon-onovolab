FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY db.json ./
EXPOSE 3001
CMD [ "npm", "start" ]

