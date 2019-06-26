
const fs = require('fs');
const directoryPath = './old-files';

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    console.log(files);
    files.forEach((file) => {
        fs.rename(file, 'newFile.txt' (err) => {
            if (err) console.log(err);
        })
    });
});