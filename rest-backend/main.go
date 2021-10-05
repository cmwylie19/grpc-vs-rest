package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/cmwylie19/grpc-vs-rest/http-backend/handlers"
	"github.com/cmwylie19/grpc-vs-rest/http-backend/middleware"
)

func HandleRequests() {
	http.HandleFunc("/backend/healthz", middleware.LoggingMiddleware(handlers.GetRemote))
	fmt.Println("Serving from :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
func main() {
	HandleRequests()

}
