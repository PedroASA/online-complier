const express = require('express')
const app = express()
const port = 9000


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const sh = require('./run-code.js'),
modes = require('./modes.js');

app.post('/code', (req, res) => {

  if(!req.body.language)
    res.status(400).json({
      error : "No language specification was sent."
    });
  if(!req.body.code) 
    res.status(400).json({
      error : "No code was sent."
    });
  if(req.body.stdIn !== undefined) 
    res.status(400).json({
      error : "No input was sent."
    });

  const [out, err] = sh.run_code(req.body);
  
  res.setHeader('Content-Type', 'application/json');
  res.status(400).json({
    language:req.body.language,
    env:{
        os:"ubuntu 18.04",
        compiler:"nodejs 14.00"
    },
    stdOut: out,
    stdErr: err
  });
})

app.get('/code', (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(modes) + "\n" + process.env.NODE_ENV);
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})