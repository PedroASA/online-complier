const inputFile = "api/tmp/in.txt",
        outputFile = "api/tmp/out.txt",
        errorFile = "api/tmp/err.txt",
        codeFile = 'api/tmp/code',

modes = require('./modes.js'),
fs = require('fs');

const execSync = require('child_process').execSync;

const run = (cmd) => {
    try {
        execSync(cmd)
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        // var fr=new FileReader(); 
        
        const out = 
        // fr.readAsText(outputFile).toString();
        fs.readFileSync(outputFile, err => {if(err) console.log(err)}).toString(), 
              err = 
            //   fr.readAsText(errorFile).toString();
              fs.readFileSync(errorFile, err => {if(err) console.log(err)}).toString();
              console.log(out, err);
        return [out, err];
    }
};

module.exports.run_code = function (body) {

    let extension = modes[body.language][1],
    file = `${codeFile}.${extension}`;

    fs.writeFileSync(inputFile, (body.stdIn || ''), err => {if(err) console.log(err)});
    fs.writeFileSync(file, body.code, err => {if(err) console.log(err)});

    return run(`node ${file} < ${inputFile} > ${outputFile} 2> ${errorFile}`);
};;