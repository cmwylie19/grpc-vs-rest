package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/cmwylie19/grpc-vs-rest/rest-backend/handlers"
	"github.com/cmwylie19/grpc-vs-rest/rest-backend/middleware"
)

func HandleRequests() {
	http.HandleFunc("/rest/healthz", middleware.LoggingMiddleware(handlers.GetRemote))
	http.HandleFunc("/rest/img/create", middleware.LoggingMiddleware(handlers.CreateImage))
	http.HandleFunc("/rest/img/get", middleware.LoggingMiddleware(handlers.GetImage))
	fmt.Println("Serving from :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
func main() {
	HandleRequests()

}
