const fs = require('fs');
const axios = require('axios');
const validator = require('validator');

function cat(path){
    let contents = fs.readFile(path, 'utf8', function(err, data){
        if (err) {
            console.error(`Error raeding ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    })
}

async function webCat(url){
    try{
        const response = await axios.get(url);
        console.log(response.data);
    }catch (err){
        console.error(`Error fetching ${url}: ${err}`)
    }
}

const urlOptions = {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_host: true,
    require_tld: true
};

if (validator.isURL(process.argv[2], urlOptions)){
    webCat(process.argv[2]);
}else{
    cat(process.argv[2]);
}
