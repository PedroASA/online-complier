const express = require('express')
const app = express()
const port = 3001

app.post('/', (req, res) => {
  res.send({
    language:"javascript",
    env:{
        os:"ubuntu 18.04",
        compiler:"nodejs 14.00"
    },
    stdOut:"Hello World!",
    stdErr:""
  })
})

app.get('/', (req, res) => 
    res.send('Only Post requests!')    
)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})