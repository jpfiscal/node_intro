const fs = require('fs');

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

cat(process.argv[2]);