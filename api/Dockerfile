FROM node:12
# ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install

WORKDIR /usr/src/app

COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
