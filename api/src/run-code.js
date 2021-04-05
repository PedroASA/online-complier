/*
    Run code from given body information such as 
    body.stdIn, body.code, body.language, etc.
*/

// path to /tmp/ folder its files' names
const inputFile = "./src/tmp/in.txt",
        outputFile = "./src/tmp/out.txt",
        errorFile = "./src/tmp/err.txt",
        scripts = './src/scripts/',
        codeFile = './src/tmp/code';

// currently supported modes.
modes = require('./modes.js'),
// write to and read from files.
fs = require('fs');

// run commands on terminal.
const execSync = require('child_process').execSync;

// execute given command and return its stdout and stderr.
const run = (cmd) => {
    try {
        execSync(cmd);
    } 
    finally {        
        const out = fs.readFileSync(outputFile, err => {if(err) console.log(err)}).toString(), 
              err = fs.readFileSync(errorFile, err => {if(err) console.log(err)}).toString();
        return [out, err];
    }
};

/* 
    write body.stdin to /tmp/in.txt and body.code
    to /tmp/code.<<language extension>> and run the 
    appropriate script file.
*/
module.exports.run_code = function (body) {

    // write to input file.
    fs.writeFileSync(inputFile, (body.stdIn || ''), err => {if(err) console.log(err)});

    // console.log(body, modes[body.language]);

    let extension = modes[body.language][1],
        file = `${codeFile}.${extension}`;

    // write to code file
    fs.writeFileSync(file, body.code, err => {if(err) console.log(err)});

    return run(`bash ${scripts}/run-${extension}.bash`);

};