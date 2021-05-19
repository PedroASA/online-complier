package main

import (
	"io/ioutil"
	"strings"
	"testing"

	"github.com/google/go-cmp/cmp"
)

// Test Run() with valid input
func TestRun1(t *testing.T) {

	body := ioutil.NopCloser(strings.NewReader(
		`{
				"language": "javascript",
				"code": "",
				"stdIn": ""
			}`))

	stdout, stderr, err := Run(body)
	want_stdout := []byte{}
	want_stderr := []byte{}

	if diff := cmp.Diff(stdout, want_stdout); diff != "" {
		t.Errorf("Stdout mismatch (-want +got):\n%s", diff)
	}
	if diff := cmp.Diff(stderr, want_stderr); diff != "" {
		t.Errorf("Stderr mismatch (-want +got):\n%s", diff)
	}

	if err != nil {
		t.Errorf("An unexpected error was raised:\n %v\n %T", err, err)
	} else {
		if diff := cmp.Diff(stdout, want_stdout); diff != "" {
			t.Errorf("Stdout mismatch (-want +got):\n%s", diff)
		}
		if diff := cmp.Diff(stderr, want_stderr); diff != "" {
			t.Errorf("Stderr mismatch (-want +got):\n%s", diff)
		}
	}
}

// Test Run() with valid input
func TestRun2(t *testing.T) {

	body := ioutil.NopCloser(strings.NewReader(
		`{
				"language": "cpp",
				"code": "#include <iostream>\nint main() {std::cout << \"Hello\" << std::endl;return 0;}",
				"stdIn": ""
			}`))

	stdout, stderr, err := Run(body)
	want_stdout := []byte("Hello\n")
	want_stderr := []byte{}

	if err != nil {
		t.Errorf("An unexpected error was raised:\n %v\n %T", err, err)
	} else {
		if diff := cmp.Diff(want_stdout, stdout); diff != "" {
			t.Errorf("Stdout mismatch (-want +got):\n%s", diff)
		}
		if diff := cmp.Diff(want_stderr, stderr); diff != "" {
			t.Errorf("Stderr mismatch (-want +got):\n%s", diff)
		}
	}

}

// Test Run() with invalid input
func TestRun3(t *testing.T) {

	body := ioutil.NopCloser(strings.NewReader(
		`{
				"language": "lalsdldf"
			}`))

	stdout, stderr, err := Run(body)

	switch err.(type) {
	case nil:
		t.Errorf("Expected error was not raised\nStdout: %v\nStderr: %v\n", stdout, stderr)
	case *InvalidLanguageError:

	default:
		t.Errorf("An unexpected error was raised:\n %v\n %T", err, err)
	}

	if stderr != nil {
		t.Errorf("Stderr is not nil\n%s", stderr)
	}
	if stdout != nil {
		t.Errorf("Stdout is not nil\n%s", stdout)
	}

}
