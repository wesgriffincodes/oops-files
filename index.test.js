const { getAnimal, createFiles } = require('./index');
const fs = require('fs');

describe('create files', () => {

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

  it('can get a random animal', () => {
    const animal = getAnimal();
    expect(animal).toEqual(expect.any(String));
  });
});

it('can write a bunch of files with wanimals in them', (done) => {
  createFiles('./new-files', 100, (err) => {
    expect(err).toBeFalsy();

    fs.readdir('./old-files', { encoding: 'utf8' }, (err, files) => {
      expect(files).toHaveLength(100);
      done();
    });
  });
});
