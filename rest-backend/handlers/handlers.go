package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/cmwylie19/grpc-vs-rest/rest-backend/controllers"
	"github.com/cmwylie19/grpc-vs-rest/rest-backend/models"
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

func CreateImage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var img models.Image

	_ = json.NewDecoder(r.Body).Decode(&img)
	fmt.Println("Image: ", img)
	err1 := controllers.CreateImage(img)
	if err1 != nil {
		controllers.GetError(err1, w)
		return
	}
	result, err := json.Marshal(img)
	if err != nil {
		controllers.GetError(err, w)
		return
	}
	w.Write(result)
}

func GetImage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	fmt.Println("PArams: ", r.URL.Path[1:])
	img, err := controllers.GetImage("archie.jpg")
	if err != nil {
		controllers.GetError(err, w)
		return
	}

	result, _ := json.Marshal(img)
	w.Write(result)
}
