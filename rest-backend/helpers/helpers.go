package helpers

import (
	"context"
	"fmt"
	"os"
	"sync"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var clientInstance *mongo.Client

var clientInstanceError error

var mongoOnce sync.Once

const (
	DB     = "imagedb"
	IMAGES = "images"
)

func GetMongoClient() (*mongo.Client, error) {
	CONN_STRING := os.Getenv("MONGO_URL")
	fmt.Println("Conn string: ", CONN_STRING)
	mongoOnce.Do(func() {
		clientOptions := options.Client().ApplyURI(CONN_STRING)
		client, err := mongo.Connect(context.TODO(), clientOptions)
		if err != nil {
			fmt.Println("CONNECTON ERROR: ", err)
			clientInstanceError = err
		}
		err = client.Ping(context.TODO(), nil)
		if err != nil {
			fmt.Println("PING ERROR: ", err)
			clientInstanceError = err
		}
		clientInstance = client
	})
	return clientInstance, clientInstanceError
}
