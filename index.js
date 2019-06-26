const fs = require('fs');
const directoryPath = './new-files';

const animals = [
  'dog',
  'leopard',
  'baboon',
  'lemur',
  'koala',
  'gorilla',
];

const getAnimal = () => {
  const index = Math.floor(Math.random() * animals.length);
  return animals[index];
};


const createFiles = (directory, fileCount, callback) => {
  let writtenSoFar = 0;
  for(let i = 0; i < fileCount; i++) {
    fs.writeFile(`${directory}/${i}.txt`, getAnimal(), (err) => {
      if(err) return callback(err);
      writtenSoFar += 1;

      if(writtenSoFar === count) callback();

    });
  }
};

// fs.readdir(directoryPath, function(err, files) {
//   if(err) {
//     return console.log('Unable to scan directory: ' + err);
//   } 
//   console.log(files);
//   files.forEach((file) => {
//     fs.rename(file, 'newFile.txt', (err) => {
//       if(err) console.log(err);
//     });
//   });
// });


module.exports = { getAnimal, createFiles };
