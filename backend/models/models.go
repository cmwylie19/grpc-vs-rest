package models

import (
	"context"
	"log"
	"time"

	"github.com/cmwylie19/grpc-vs-rest/backend/api"
	"google.golang.org/grpc"
)

type WrappedStream struct {
	grpc.ServerStream
}

func (w *WrappedStream) RecvMsg(m interface{}) error {
	log.Printf("========= [Server Stream Interceptor Wrapper - RcvMsg] "+"Receive a message (Type: %T) at %s", m, time.Now().Format(time.RFC3339))
	return w.ServerStream.RecvMsg(m)
}

func (w *WrappedStream) SendMsg(m interface{}) error {
	log.Printf("========= [Server Stream Interceptor Wrapper - SendMsg] "+"Send a message (Type: %T) at %s", m, time.Now().Format(time.RFC3339))
	return w.ServerStream.SendMsg(m)
}

type Server struct {
	api.UnimplementedImageServer
}

func (s *Server) HealthCheck(ctx context.Context, in *api.HealthCheckRequest) (*api.HealthCheckResponse, error) {
	return &api.HealthCheckResponse{
		XFF: "99.23.45.144",
	}, nil
}

type Remote struct {
	XFF string `json:"x-forwarded-for"`
}

type SuccessResponse struct {
	StatusCode int    `json:"status"`
	Message    string `json:"message"`
}

type ErrorResponse struct {
	StatusCode   int    `json:"status"`
	ErrorMessage string `json:"message"`
}
