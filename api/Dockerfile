# Debian OS with go and g++ installed.
FROM golang:1.14

# Install GHC 
RUN apt-get update && apt-get install -y ghc ghc-prof ghc-doc

# Install node12
RUN curl -fsSL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs


# ENV GO111MODULE=on \
#     CGO_ENABLED=0 \
#     GOOS=linux \
#     GOARCH=amd64

WORKDIR /go/src/app
COPY . .

# COPY go.mod .
# COPY go.sum .
# RUN go mod download

RUN go get -d -v ./...
RUN go install -v ./...

ENV PORT=9000
EXPOSE 9000

CMD ["go run ./src"]
