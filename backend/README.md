# Generate Protos

- [Prerequisites](#prerequisites)
- [Backend](#backend)
- [Frontend](#frontend)
- [Interaction with GRPC](#interaction)

## Prerequisites
- Install Proto
- Install protoc-gen-grpc-web


## Backend
From the backend folder
```
protoc api/image.proto --go_out=. --go-grpc_out=.
```

## Frontend
From the backend folder
```
protoc api/image.proto --js_out=import_style=commonjs,binary:../frontend/src --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../frontend/src --go-grpc_out=. --go_out=.
```

## Interaction
```
grpcurl -plaintext localhost:8081 list

 grpcurl -plaintext localhost:8081 describe images.Image
images.Image is a service:
service Image {
  rpc GetImageUnary ( .images.ImageRequest ) returns ( .images.ImageResponse );
  rpc GetImagesStream ( .images.ImageRequest ) returns ( stream .images.ImageResponse );
  rpc GetImagesUnary ( .images.ImageRequest ) returns ( .images.ImagesResponse );
  rpc HealthCheck ( .images.HealthCheckRequest ) returns ( .images.HealthCheckResponse );
}

grpcurl -plaintext localhost:8081 images.Image/HealthCheck
```