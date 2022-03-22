const fs = require('fs/promises');
const minify = require('jsonminify');

const jsonDir = 'build/Data';

fs.readdir(jsonDir)
  .then(fileNames => {
    const jobs = fileNames.map(fileName => {
      const filePath = jsonDir + '/' + fileName;
      console.log('reading', filePath);
      return fs
        .readFile(filePath)
        .then(buffer => {
          const content = buffer.toString();
          console.log('minifying', filePath);
          const minified = minify(content);
          console.log('writing', filePath);
          return fs.writeFile(filePath, minified);
        })
        .then(() => console.log('minified', filePath));
    });
    return Promise.all(jobs);
  })
  .then(() => console.log('Done'));
