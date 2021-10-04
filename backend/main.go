package main

import (
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/cmwylie19/grpc-vs-rest/backend/api"
	"github.com/cmwylie19/grpc-vs-rest/backend/controllers"
	"github.com/cmwylie19/grpc-vs-rest/backend/handlers"
	"github.com/cmwylie19/grpc-vs-rest/backend/middleware"
	"github.com/cmwylie19/grpc-vs-rest/backend/models"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func HandleHTTPRequests() {
	http.HandleFunc("/backend/healthz", middleware.LoggingMiddleware(handlers.GetRemote))
	fmt.Println("Serving from :8080")
	//log.Fatal(http.ListenAndServe(":8080", nil))
	go func() {
		http.ListenAndServe(":8080", nil)
	}()
}

func HandleGRPCRequests() {
	lis, err := net.Listen("tcp", ":8081")
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	s := grpc.NewServer(grpc.UnaryInterceptor(controllers.ImageUnaryServerInterceptor), grpc.StreamInterceptor(controllers.ImageServerStreamInterceptor))
	api.RegisterImageServer(s, &models.Server{})
	reflection.Register(s)

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
func main() {

	HandleGRPCRequests()
	HandleHTTPRequests()
}
