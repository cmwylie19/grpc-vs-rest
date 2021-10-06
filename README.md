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
- docs - GitHib pages docs site
- frontend - Frontend of the application, react app
- backend - backend of the application, golang
- charts - Helm charts for deploying the application
- .github/workflows - Pipeline manifests for testing the application and deploying into production

### Prerequisites
_The following assets are required locally to run this application._

- Node v14
- Go 1.16
- mongo 5.0.2

### Local Development
_This section details how to setup the environment locally for development._

**NOTE** you will need to change the `/frontend/src/App.js` file because it is pointing to a production domain name.

You are on your own in terms of getting around CORS erros. One way to get around them is to deploy into a kubernetes environment where your pods run under the same domain.

Clone the repo
```
git clone https://github.com/cmwylie19/grpc-vs-rest
```

Run the react-app
```
cd frontend;

# install dependencies
yarn

# run the frontend
REACT_APP_BACKEND_URL=http://localhost:8080 yarn start 
```
Start MongoDB
```
brew services start mongodb-community

# or

docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:5.0.2
```
Run the rest-backend
```
# change to the backend directory grpc-vs-rest/backend
cd rest-backend

# Install dependencies
go mod tidy

# Run the backend
MONGO_URL=mongodb://localhost:27017 go run main.go
```

### Pipeline
The pipeline consists of multiple jobs. The expectation is the the code pushed into the pipeline will be tested and errors will be detected before going to prod. It is extremely important to test code locally before pushing code into the pipeline to make sure all tests are passing and that any new features are well tested. Pull Requests will not be accepted if they fail the pipeline.

**PIPELINE IS NOT IMPLEMENTED**


  # - match:
  #   - uri:
  #       prefix: /com.example.grpc.EchoService/
  #   route:
  #   - destination:
  #       host: echo-server
