const inputFile = "./src/tmp/in.txt",
        outputFile = "./src/tmp/out.txt",
        errorFile = "./src/tmp/err.txt",
        execFile = './src/tmp/exec.exe',
        scripts = './src/scripts/',
        codeFile = './src/tmp/code';
        // container = 'api-container';

modes = require('./modes.js'),
fs = require('fs');

const execSync = require('child_process').execSync;

const run = (cmd) => {
    try {
        
        execSync(cmd);
        // execSync('docker container exec -it magical_williams bash');
        // execSync('exit');
    } 
    catch (error) {
        console.log(error);
    }
    finally {        
        const out = fs.readFileSync(outputFile, err => {if(err) console.log(err)}).toString(), 
              err = fs.readFileSync(errorFile, err => {if(err) console.log(err)}).toString();
        return [out, err];
    }
};

module.exports.run_code = function (body) {

    // write to input file.
    fs.writeFileSync(inputFile, (body.stdIn || ''), err => {if(err) console.log(err)});

    // console.log(body, modes[body.language]);

    let extension = modes[body.language][1],
        file = `${codeFile}.${extension}`;

    // write to code file
    fs.writeFileSync(file, body.code, err => {if(err) console.log(err)});

    return run(`bash ./${scripts}/run-${extension}.bash`);

};