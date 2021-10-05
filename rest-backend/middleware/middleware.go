package middleware

import (
	"log"
	"net/http"
)

func LoggingMiddleware(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL.Path)
		// Pass request along
		f(w, r)
	}
}
