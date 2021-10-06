# Auth Service
FROM golang:latest
LABEL description="gRPC Image Service for gRPC-vs-rest" \
      maintainer="Casey Wylie <casewylie@gmail.com>"
ENV LogLevel "info"
WORKDIR /go/src/app
ADD . .
CMD ["go", "run", "main.go"]
