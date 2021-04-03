# Debian OS with node, npm and g++ installed.
FROM node:12

# Install GHC 
RUN apt-get update && apt-get install -y ghc ghc-prof ghc-doc



WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
ENV PORT=9000
EXPOSE 9000
CMD ["npm", "start"]
