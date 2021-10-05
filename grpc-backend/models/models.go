package models

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/cmwylie19/grpc-vs-rest/grpc-backend/api"
	"github.com/cmwylie19/grpc-vs-rest/grpc-backend/helpers"
	"github.com/globalsign/mgo/bson"
	"google.golang.org/grpc"
)

type WrappedStream struct {
	grpc.ServerStream
}

type Image struct {
	Source string `json:"source"`
	Name   string `json:"name"`
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
func GetImage(name string) (Image, error) {
	result := Image{}
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

func (s *Server) GetImagesStream(req *api.ImageRequest, stream api.Image_GetImagesStreamServer) error {
	img, err1 := GetImage("archie")
	if err1 != nil {
		log.Println("Error getting image: ", err1)
		return err1
	}
	for x := 0; x < 60; x++ {

		res := &api.ImageResponse{
			Source: img.Source,
		}
		err := stream.Send(res)
		if err != nil {
			log.Println("Error sending Image Stream: ", err)
			return err
		}
	}
	return nil
}

func (s *Server) StoreImage(ctx context.Context, in *api.StoreImageRequest) (*api.StoreImageResponse, error) {
	image := Image{
		Source: in.GetSource(),
		Name:   "archie",
	}
	err := CreateImage(image)
	if err != nil {
		log.Println("Error creating image: ", err)
		return nil, err
	}
	return &api.StoreImageResponse{
		Message: "ok",
	}, nil
}

// func(s *Server) GetImagesStream(ctx context.Context,)
func CreateImage(image Image) error {
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
