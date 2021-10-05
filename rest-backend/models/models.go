package models

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

type Image struct {
	Source string `json:"source"`
	Name   string `json:"name"`
}
