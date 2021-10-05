package controllers

import (
	"context"

	"github.com/cmwylie19/grpc-vs-rest/grpc-backend/helpers"
	"github.com/cmwylie19/grpc-vs-rest/grpc-backend/models"
	"github.com/globalsign/mgo/bson"
)

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
