const fs = require('fs');
const axios = require('axios');
const validator = require('validator');
let dataPos = 2;

function cat(path){
    const outPos = findOutInArgv();
    console.log(outPos);
    let contents = fs.readFile(path, 'utf8', function(err, data){
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            if(outPos == -1){
                console.log(data);
            }else{
                writeToFile(outPos+1, data);
            }
            
        }
    })
}

async function webCat(url){
    try{
        const response = await axios.get(url);
        const outPos = findOutInArgv();
        if (outPos == -1){
            console.log(response.data);
        }else{
            writeToFile(outPos+1, response.data);
        }
    }catch (err){
        console.error(`Error fetching ${url}: ${err}`)
    }
}

function findOutInArgv(){
    for (let i=0; i<process.argv.length; i++){
        if (process.argv[i] === "--out"){
            return i
        }
    }
    return -1;
}

function writeToFile(outIdx, data){
    fs.writeFile(process.argv[outIdx], data, 'utf-8', function(err){
        if (err){
            console.error(`Couldn't write to ${process.argv[outIdx]}: ${err}`);
            process.exit(1);
        }
        console.log('Written to file successfully!');
    })
}

const urlOptions = {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_host: true,
    require_tld: true
};

if (findOutInArgv() == -1){
    dataPos=2;
}else{
    dataPos=4;
}
if (validator.isURL(process.argv[dataPos], urlOptions)){
    webCat(process.argv[dataPos]);
}else{
    cat(process.argv[dataPos]);
}

