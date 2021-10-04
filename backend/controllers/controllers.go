package controllers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/cmwylie19/grpc-vs-rest/backend/models"
	"google.golang.org/grpc"
)

func SuccessResponse(message string, w http.ResponseWriter) {
	var response = models.SuccessResponse{
		StatusCode: http.StatusOK,
		Message:    message,
	}
	msg, _ := json.Marshal(response)
	w.WriteHeader(response.StatusCode)
	w.Write(msg)
}

func GetError(err error, w http.ResponseWriter) {
	var response = models.ErrorResponse{
		ErrorMessage: err.Error(),
		StatusCode:   http.StatusInternalServerError,
	}

	message, _ := json.Marshal(response)

	w.WriteHeader(response.StatusCode)
	w.Write(message)
}

func NewWrappedStream(s grpc.ServerStream) grpc.ServerStream {
	return &models.WrappedStream{s}
}

func ImageServerStreamInterceptor(srv interface{}, ss grpc.ServerStream, info *grpc.StreamServerInfo, handler grpc.StreamHandler) error {
	log.Println("========= [Server Stream Interceptor] ", info.FullMethod)
	err := handler(srv, NewWrappedStream(ss))
	if err != nil {
		log.Printf("RPC failed with error %v", err)
	}
	return err
}

func ImageUnaryServerInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	// preprocessing logic
	// gets info about the current RPC call by examining the args passed in
	log.Println("========= [Server interceptor] ", info.FullMethod)

	// Invoke the handler to complete the normal execution of a unary RPC
	m, err := handler(ctx, req)

	//Post processing logic
	log.Printf("Post Proc Message: %s", m)
	return m, err
}
