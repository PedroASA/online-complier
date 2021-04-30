package main

import (
	"encoding/json"
	"io/ioutil"
	"strings"
	"testing"

	"github.com/google/go-cmp/cmp"
)

// Test ReadBody with an expected input
func TestReadBody1(t *testing.T) {

	body := ioutil.NopCloser(strings.NewReader(
		`{
				"language": "javascript",
				"code": "",
				"stdIn": ""
			}`))

	reqbody, err := ReadBody(body)
	want := ReqBody{Language: "javascript", Code: "", StdIn: ""}

	if diff := cmp.Diff(reqbody, want); diff != "" {
		t.Errorf("ReadBody() mismatch (-want +got):\n%s", diff)
	}

	if err != nil {
		t.Errorf("An unexpected error was raised:\n %v", err)
	}
}

// Test ReadBody with an unexpected input: Json Decoding
func TestReadBody2(t *testing.T) {

	body := ioutil.NopCloser(strings.NewReader(
		`{
		"language": false,
		"sdfse": "sdfsd",
		"stdsdfsIn": "",
		"asdasds" :"sdfsdfsd"
	}`))

	reqbody, err := ReadBody(body)
	want := ReqBody{}

	if diff := cmp.Diff(reqbody, want); diff != "" {
		t.Errorf("ReadBody() mismatch (-want +got):\n%s", diff)
	}
	switch err.(type) {
	case nil:
		t.Errorf("Expected error was not raised\nRequest: %v", reqbody)
	case *json.UnmarshalTypeError, *json.SyntaxError:

	default:
		t.Errorf("An unexpected error was raised:\n %v\n %T", err, err)
	}
}

// Test ReadBody with an unexpected input: Invalid Language
func TestReadBody3(t *testing.T) {

	body := ioutil.NopCloser(strings.NewReader(
		`{
		"language": "sdas"
	}`))

	reqbody, err := ReadBody(body)
	want := ReqBody{}

	if diff := cmp.Diff(reqbody, want); diff != "" {
		t.Errorf("ReadBody() mismatch (-want +got):\n%s", diff)
	}
	switch err.(type) {
	case nil:
		t.Errorf("Expected error was not raised\nRequest: %v", reqbody)
	case *InvalidLanguageError:

	default:
		t.Errorf("An unexpected error was raised:\n %v\n %T", err, err)
	}
}

// Test GetModes return value
func TestGetModes(t *testing.T) {

	modes, err := GetModes()

	want := map[string][]string{
		"javascript": {"// Type your code here!", "js"},
		"cpp":        {"// Type your code here!", "cpp"},
		"haskell":    {"-- Type your code here!", "hs"},
		"json":       {"{}"},
		"html":       {"<!-- Leave your marks here! -->"},
		"css":        {"/* Style freely */"},
		"markdown":   {"### Title"},
	}

	if diff := cmp.Diff(modes, want); diff != "" {
		t.Errorf("GetModes() mismatch (-want +got):\n%s", diff)
	}
	if err != nil {
		t.Errorf("An unexpected error was raised:\n %v\n %T", err, err)
	}
}
