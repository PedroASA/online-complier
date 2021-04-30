/*
   Run code from given body information such as
   body.stdIn, body.code, body.language, etc.
*/

package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"os/exec"
)

// path to /tmp/ folder and its files' names
const (
	scripts  = "scripts/"
	codeFile = "tmp/code"
)

// write body.code to /tmp/code.<<language extension>> and run the appropriate script file.
// write body.stdin to the stdin of the running file and get its stdout and stderr.
func Run(body io.ReadCloser) (stdout, stderr []byte, err error) {

	// Decode request body
	reqbody, err := ReadBody(body)

	if err != nil {
		return
	}
	// If modes is not know, get it.
	if modes == nil {
		modes, err = GetModes()
		if err != nil {
			return
		}
	}

	// Get the file extension for given language.
	extension := modes[reqbody.Language][1]
	// Get the appropriate file name for given language.
	file := fmt.Sprintf("%s.%s", codeFile, extension)

	// Write body.Code to file
	if err = ioutil.WriteFile(file, []byte(reqbody.Code), 0644); err != nil {
		return
	}

	// script file to be ran.
	script := fmt.Sprintf("%s/run-%s.bash", scripts, extension)

	// How to run the script
	cmd := exec.Command("bash", script)

	// get scripts stdin, stdout, stderr
	cmdIn, _ := cmd.StdinPipe()
	cmdOut, _ := cmd.StdoutPipe()
	cmdErr, _ := cmd.StderrPipe()

	// run script
	cmd.Start()
	// write to its stdin
	cmdIn.Write([]byte(reqbody.StdIn))
	cmdIn.Close()

	// Get its stdout, stderr
	stdout, _ = ioutil.ReadAll(cmdOut)
	stderr, _ = ioutil.ReadAll(cmdErr)

	// Wait command exit status.
	cmd.Wait()

	return

}
