package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/cmwylie19/grpc-vs-rest/rest-backend/helpers"
	"github.com/cmwylie19/grpc-vs-rest/rest-backend/models"
	"github.com/globalsign/mgo/bson"
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

func GetImage(name string) (models.Image, error) {
	result := models.Image{}
	filter := bson.M{"name": name}
	client, err := helpers.GetMongoClient()
	if err != nil {
		return result, err
	}

	collection := client.Database(helpers.DB).Collection(helpers.IMAGES)
	err = collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return result, err
	}
	return result, nil
}

func CreateImage(image models.Image) error {
	client, err := helpers.GetMongoClient()
	if err != nil {
		return err
	}
	fmt.Println("image.Name: ", image.Name)

	collection := client.Database(helpers.DB).Collection(helpers.IMAGES)
	_, err = collection.InsertOne(context.TODO(), image)
	if err != nil {
		fmt.Println("Error InsertOne agenda: ", err)
		return err
	}
	return nil
}
