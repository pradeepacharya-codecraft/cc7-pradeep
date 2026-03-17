// Implement the following functions.

// Returns a promise that when resolved will get you the type of file
// when error, it will come back with an Error with message "file system error"
// function that gets you the file path of the file, or names of items of the  folder
//  function that gets the size of the file or folder at given path
// Test them using a console based approach by chaining them and catch methods on the returned promises.

import fs from 'fs';
import { fileURLToPath } from 'node:url';
import path from 'path';

function getFileType(path: string): Promise<'FILE' | 'DIRECTORY' | 'OTHER'> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
      if (err) {
        reject(new Error('file system error'));
        return;
      }

      if (stats.isFile()) {
        resolve('FILE');
      } else if (stats.isDirectory()) {
        resolve('DIRECTORY');
      } else {
        resolve('OTHER');
      }
    });
  });
}

function getContents(path: string): Promise<string | string[]> {
  return new Promise((resolve, reject) => {
    getFileType(path)
      .then((type) => {
        if (type === 'FILE') {
          resolve(path);
        } else if (type === 'DIRECTORY') {
          fs.readdir(path, (err, files) => {
            if (err) {
              reject(new Error('file system error'));
              return;
            }

            resolve(files);
          });
        }
      })
      .catch((err) => reject(err));
  });
}

function getSize(p: string): Promise<number> {
  return new Promise((resolve, reject) => {
    getContents(p)
      .then((contents) => {
        if (!Array.isArray(contents)) {
          fs.stat(p, (err, stats) => {
            if (err) {
              reject(new Error('file system error'));
              return;
            }

            resolve(stats.size);
          });
        } else {
          let totalSize = 0;
          let remaining = contents.length;

          if (remaining === 0) {
            resolve(0);
            return;
          }

          contents.forEach((file) => {
            const fullPath = path.join(p, file);

            fs.stat(fullPath, (err, stats) => {
              if (err) {
                reject(new Error('file system error'));
                return;
              }

              totalSize += stats.size;
              remaining--;

              if (remaining === 0) {
                resolve(totalSize);
              }
            });
          });
        }
      })
      .catch((err) => reject(err));
  });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//file path
getFileType(__filename)
  .then((type) => {
    console.log('File Type:', type);
  })
  .catch((err) => console.log(err));

//dir path
getFileType(__dirname)
  .then((type) => {
    console.log('File Type:', type);
  })
  .catch((err) => console.log(err));

//file content
getContents(__filename)
  .then((type) => {
    console.log('content:', type);
  })
  .catch((err) => console.log(err));

//dir content
getContents(__dirname)
  .then((type) => {
    console.log('Folder content:', type);
  })
  .catch((err) => console.log(err));

//file size
getSize(__filename)
  .then((size) => {
    console.log('File Size:', size);
  })
  .catch((err) => console.log(err));

//dir size
getSize(__dirname)
  .then((size) => {
    console.log('Folder Size:', size);
  })
  .catch((err) => console.log(err));
