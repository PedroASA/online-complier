# Ubuntu OS with node and npm installed.
FROM node:12

# Install GHC 
# RUN npm install


WORKDIR /usr/src/app
COPY package*.json .
RUN npm install

COPY . .
ENV PORT=9000
EXPOSE 9000
CMD ["npm", "start"]
