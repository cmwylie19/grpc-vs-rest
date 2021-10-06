## gRPC vs Rest
This is a simple application that requests an image from two distinc backends with two distinct databases. 
You can view the site [live](https://freshlist.us) to view the code running in production.

**Screenshot**
![App](app.png)


At this moment, the project is very young, and not finished. The production site will be changing rapidly as development ensues.

### Markdown
The application is running in Istio. We are using the envoy proxy to translate the gRPC streaming request to the frontend. `VirtualService` configuration will be seen at `vs-default.yaml` in the root folder. The `VirtualService` contains a frontend, an http-backend, and a catch all grpc-backend.

![Architecture](docs/architecture.png)

### Contributors

Huge thank you to all who have contributed to this project!

Names:


### Support or Contact

Having trouble with this application? Check out the [README.md](https://github.com/cmwylie19/grpc-vs-rest/blob/main/README.md) or file an [issue](https://github.com/cmwylie19/grpc-vs-rest/issues), or [email me](mailto:casewylie@gmail.com?subject=grpcvsrest hacktoberfest) and we’ll help you sort it out.
