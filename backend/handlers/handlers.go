package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/cmwylie19/grpc-vs-rest/backend/controllers"
	"github.com/cmwylie19/grpc-vs-rest/backend/models"
)

func GetRemote(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	remote := models.Remote{XFF: r.Header.Get("x-forwarded-for")}
	result, err := json.Marshal(remote)
	if err != nil {
		controllers.GetError(err, w)
		return
	}
	w.Write(result)
}
