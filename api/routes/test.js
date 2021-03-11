var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send(
        {
            language:"javascript",
            env:{
                os:"ubuntu 18.04",
                compiler:"nodejs 14.00"
            },
            stdOut:"Hello World!",
            stdErr:""
        }
    );
});

router.post("/", function(req, res, next) {
    res.send({
        language:"javascript",
        env:{
            os:"ubuntu 18.04",
            compiler:"nodejs 14.00"
        },
        stdOut:"Hello World!",
        stdErr:""
    })
});

module.exports = router;