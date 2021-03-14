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

router.post("/", function(req, res) {

    let { error } = validateCourse(request.body);

    if (error) {
      response.status(400).send(error.details[0].message);
    }

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