const inputFile = "./tmp/in.txt",
        outputFile = "./tmp/out.txt",
        errFile = "./tmp/err.txt",
        codeFile = './tmp/code',

modes = require('./modes.js'),
fs = require('fs');

module.exports.run_code = function (body) {

    let extension = modes[body.language][1],
    file = `${codeFile}.${extension}`;

    fs.writeFile(inputFile, (body.stdIn || ''), err => {if (err) throw err});
    fs.writeFile(file, body.code, err => {if (err) throw err});
    
    const execSync = require('child_process').execSync;
    const output = execSync(`node ${file} < ${inputFile}`, { encoding: 'utf-8' });
    console.log(output);
    return [output, ""]
};
