/*
  Simple server that runs the requested code ( /code, POST )
  and renders the supported modes ( /code, GET ).
*/

package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// all currently supported modes.
var modes, e = GetModes()

// Generic error handling function.
// Send an HTTP response with status 500 and the the error message.
func check(e error, w http.ResponseWriter) {
	if e != nil {
		http.Error(w, e.Error(), http.StatusInternalServerError)
		return
	}
}

// GET -> Send all currently supported modes from modes.json
// POST -> Run code and send its stdout and stderr if no error occurs
func code(w http.ResponseWriter, req *http.Request) {

	if modes == nil {
		modes, _ = GetModes()
	}

	switch req.Method {
	case "GET":
		json.NewEncoder(w).Encode(modes)

	case "POST":
		// Run code from request.body
		stdout, stderr, err := Run(req.Body)
		// check for errors
		check(err, w)
		// insert response into a map struct
		res := map[string]string{"stdOut": string(stdout), "stdErr": string(stderr)}
		// send map as json
		json.NewEncoder(w).Encode(res)
	default:

	}
}

func main() {

	// If an error occurs on GetModes()
	if e != nil {
		fmt.Printf("The following error occurred: %s", e.Error())
	}

	// Single accepted url
	http.HandleFunc("/code", code)

	// listen on http://localhost:9000.
	const port = ":9000"

	fmt.Printf("Listening on port%s\n", port)

	http.ListenAndServe(port, nil)
}
