/*
  Simple server that runs the requested code ( /code, POST )
  and renders the supported modes ( /code, GET ).
*/

package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"example.com/db"
	"github.com/julienschmidt/httprouter"
)

// all currently supported modes.
var modes, e = GetModes()

// Generic error handling function.
// Send an HTTP response with status 500 and the error message.
func Check(e error, w http.ResponseWriter) bool {
	if e != nil {
		http.Error(w, e.Error(), http.StatusInternalServerError)
		return true
	}
	return false
}

// GET -> Send all currently supported modes from modes.json
// POST -> Run code and send its stdout and stderr if no error occurs
func Code(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {

	if modes == nil {
		modes, _ = GetModes()
	}

	switch req.Method {
	case "GET":
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(modes)

	case "POST":
		// Run code from request.body
		stdout, stderr, err := Run(req.Body)
		// check for errors
		if !Check(err, w) {
			// insert response into a map struct
			res := map[string]string{"stdOut": string(stdout), "stdErr": string(stderr)}
			// send map as json
			json.NewEncoder(w).Encode(res)
			w.WriteHeader(http.StatusOK)
		}
	default:

	}
}

func Files(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {

	switch req.Method {
	case "GET":
		codes, err := db.AllCodes()
		if !Check(err, w) {
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(codes)
		}

	case "POST":
		body, err := db.ReadBody(req.Body)
		err = db.CreateCode(body.Title, body.Language, body.Content)
		if !Check(err, w) {
			w.Write([]byte("File Created Successfuly!"))
			w.WriteHeader(http.StatusOK)
		}

	default:

	}
}

func File(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {

	title := ps.ByName("title")
	if title == "" {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	switch req.Method {
	case "GET":
		code, err := db.ReadCode(title)
		if !Check(err, w) {
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(code)
		}

	case "PUT":

		body, err := ioutil.ReadAll(req.Body)
		if !Check(err, w) {
			var newContent struct{ Content string }
			err = json.Unmarshal(body, &newContent)

			err2 := db.UpdateCode(title, newContent.Content)

			if !Check(err, w) && !Check(err2, w) {
				w.WriteHeader(http.StatusOK)
				w.Write([]byte("File Updated Successfuly!"))
			}
		}

	case "DELETE":

		err := db.DeleteCode(title)
		if !Check(err, w) {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte("File Deleted Successfuly!"))
		}

	default:

	}
}

func main() {

	// If an error occurs on GetModes()
	if e != nil {
		panic(e)
	}
	router := httprouter.New()

	router.GET("/code", Code)
	router.POST("/code", Code)

	router.GET("/files", Files)
	router.POST("/files", Files)

	router.GET("/file/:title", File)
	router.POST("/file/:title", File)
	router.PUT("/file/:title", File)
	router.DELETE("/file/:title", File)

	// listen on http://localhost:9000.
	const port = ":9000"

	fmt.Printf("Listening on port%s\n", port)

	http.ListenAndServe(port, router)
}
