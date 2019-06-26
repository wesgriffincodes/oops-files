const fs = require('fs');
const { createFiles } = require('./index');
const { readDirectory, rename } = require('./rename-files');

describe('rename functions', () => {
  beforeEach((done) => {
    createFiles('./new-files', 100, done);
  });
});

afterEach((done) => {
  fs.readdir('./old-files', (err, files) => {
    if(files.length === 0) done();
    let deletedSoFar = 0;
    files.forEach(file => {
      fs.unlink(`./old-files/${file}`, (err) => {
        if(err) return done(err);
        deletedSoFar += 1;
        if(deletedSoFar === files.length) done();
      });
    });
  });
});

it('gets all files in target', (done) => {
  readDirectory('./old-files', (err, files) => {
    expect(files).toHaveLength(100);
    done();
  });
});

it('can rename a file given a path and new path', done => {
  fs.readFile('./fixtures/0.txt', { encoding: 'utf8' }, (err, oldFileContent) => {
    rename('./fixtures/0.txt', './fixtures/new-name.txt', err => {
      expect(err).toBeFalsy();

      fs.readFile('./fixtures/new-name.txt', { encoding: 'utf8' }, (err, newFileContent) => {
        expect(err).toBeFalsy();

        expect(newFileContent).toEqual(oldFileContent);
        done();
      });
    });
  });
});
