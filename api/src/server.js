/*
  Simple express server that runs the requested code ( /code, POST )
  and renders the supported modes ( /code, GET ).
*/

// import express
const express = require('express')
const app = express()

// listen on http://localhost:9000.
const port = 9000

// decode json request.body.
app.use(express.json()) // for parsing application/json
// Not necessary ?
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// function to run the appropriate script.
const sh = require('./run-code.js'),
// all currently supported modes.
modes = require('./modes.js');

// POST : Run given code.
app.post('/code', (req, res) => {

  // Assert request is good.
  if(!req.body.language)
    res.status(400).json({
      error : "No language specification was sent."
    });
  if(!req.body.code) 
    res.status(400).json({
      error : "No code was sent."
    });
  if(req.body.stdIn === undefined) 
    res.status(400).json({
      error : "No input was sent."
    });

  // Run code from request.body
  const [out, err] = sh.run_code(req.body);
  
  // Send back generated output and error messages.
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    language:req.body.language,
    env:{
        os:"ubuntu 18.04",
        compiler:"nodejs 12.00"
    },
    stdOut: out,
    stdErr: err
  });
})

// GET -> Send all currently supported codeMirror modes.
app.get('/code', (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(modes));
})

// Run server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})