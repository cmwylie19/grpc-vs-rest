# Generate Protos

- [Prerequisites](#prerequisites)
- [Backend](#backend)
- [Frontend](#frontend)

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