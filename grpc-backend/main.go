package main

import (
	"log"
	"net"

	"github.com/cmwylie19/grpc-vs-rest/grpc-backend/api"
	"github.com/cmwylie19/grpc-vs-rest/grpc-backend/middleware"
	"github.com/cmwylie19/grpc-vs-rest/grpc-backend/models"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func HandleRequests() {
	lis, err := net.Listen("tcp", ":8081")
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	s := grpc.NewServer(grpc.UnaryInterceptor(middleware.ImageUnaryServerInterceptor), grpc.StreamInterceptor(middleware.ImageServerStreamInterceptor))
	api.RegisterImageServer(s, &models.Server{})
	reflection.Register(s)

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}

func main() {
	HandleRequests()
}
