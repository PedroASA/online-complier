package db

import (
	"encoding/json"
	"io"
	"io/ioutil"
)

// The expected requests' bodies are of this form
type ReqBody struct {
	Content  string `json:"content"`
	Language string `json:"language"`
	Title    string `json:"title"`
}

// Read json body into a ReqBody struct.
func ReadBody(body io.ReadCloser) (reqbody ReqBody, err error) {
	content, err := ioutil.ReadAll(body)
	if err != nil {
		return reqbody, err
	}
	if err = json.Unmarshal([]byte(content), &reqbody); err != nil {
		return ReqBody{}, err
	}
	return
}
