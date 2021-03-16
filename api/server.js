const express = require('express')
const app = express()
const port = 9000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const sh = require('./run-code.js'),
modes = require('./modes.js');

app.post('/code', (req, res) => {
  
  const [out, err] = sh.run_code(req.body); 

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    language:"javascript",
    env:{
        os:"ubuntu 18.04",
        compiler:"nodejs 14.00"
    },
    stdOut: out,
    stdErr: err
  }))
})

app.get('/code', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(modes));
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})