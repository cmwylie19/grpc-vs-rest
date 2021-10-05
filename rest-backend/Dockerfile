# Auth Service
FROM golang:latest
LABEL description="Auth service for freshlist" \
      maintainer="Freshlist Developers contact@freshlist.us"
ENV LogLevel "info"
WORKDIR /go/src/app
ADD . .
CMD ["go", "run", "main.go"]
