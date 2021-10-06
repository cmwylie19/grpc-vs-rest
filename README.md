# grpc-vs-rest
* [Preview App](#preview-app)
* [Contributing](#contributing)
* [Project Overview](#project-overview)
  * [Architecture](#architecture)
* [Code Base](#code-base)
* [Prerequisites](#prerequisites)
* [Local Development](#local-development)
* [Pipeline](#pipeline)

## Preview App

Go to the app's [website](https://cmwylie19.github.io/grpc-vs-rest/).

View the application running [live](https://freshlist.us).

This is a simple application that requests an image from two distinc backends with two distinct databases. 

**Screenshot**
![App](app.png)

## Contributing
Anyone can contribute to this project, read the [CONTRIBUTING.md](docs/CONTRIBUTING.md) to get started.
   


## Project Overview
_This is a simple app meant to show the differences between doing REST vs gRPC Web Streaming vs gRPC Web Unary calls from the frontend to backend services. The gRPC backend uses envoy to translate the requests to the frontend. The application is running in Istio to make the gRPC configuration manageable._

### Architecture
![Architecture](docs/architecture.png)

### Code Base
_This section is meant to give an overview of the repository structure and how to navigate our code base._

The repository is split up into:
- frontend - react app that uses axios and gRPC web
- rest-backend - http server written in go
- grpc-backend - gRPC server written in go

### Prerequisites
_The following assets are required locally to run this application._

- Node v14
- Go 1.16
- mongo 5.0.2 (version is flexible)