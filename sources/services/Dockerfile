FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install pm2 -g
COPY . .
EXPOSE 5000
CMD ["pm2-runtime","start.js"]