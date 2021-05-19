# Debian OS with go and g++ installed.
FROM golang:1.14

# Install GHC 
RUN apt-get update && apt-get install -y ghc ghc-prof ghc-doc

# Install node12
RUN curl -fsSL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs


WORKDIR /go/src/app

COPY . .

WORKDIR /go/src/app/main

RUN go mod download

RUN go build -o main .

# Export necessary port
EXPOSE 9000

# Command to run when starting the container
CMD ["/go/src/app/main/main"]


