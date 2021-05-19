package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
)

const modesFile = "modes/modes.json"

// Modes type is a map of (language) to [initialCode, fileExtension]
type Modes = map[string][]string

// Inform that a language is not supported
type InvalidLanguageError struct {
	Language string
}

func (e *InvalidLanguageError) Error() string {
	return fmt.Sprintf("Invalid Language: %s", e.Language)
}

// get currently supported modes from json file.
func GetModes() (modes Modes, err error) {

	// read json file into string
	modeJson, err := ioutil.ReadFile(modesFile)
	if err != nil {
		return modes, err
	}
	// encode string into Modes struct.
	if err = json.Unmarshal([]byte(modeJson), &modes); err != nil {
		return Modes{}, err
	}

	return
}

// The expected requests' bodies are of this form
type ReqBody struct {
	Code     string `json:"code"`
	Language string `json:"language"`
	StdIn    string `json:"stdin"`
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
	if _, ok := modes[reqbody.Language]; !ok && modes != nil {
		return ReqBody{}, &InvalidLanguageError{"Request must contain a valid language"}
	}
	return
}
