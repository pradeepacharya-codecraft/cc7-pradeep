// Re implement the function mentioned in question 1 above, by using the promise based  fs module APIs.  Do not use async await yet.

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

function getFileType(path: string): Promise<'FILE' | 'DIRECTORY' | 'OTHER'> {
  return fs
    .stat(path)
    .then((stats) => {
      if (stats.isFile()) return 'FILE';
      if (stats.isDirectory()) return 'DIRECTORY';
      return 'OTHER';
    })
    .catch(() => {
      throw new Error('file system error');
    });
}

function getContents(p: string): Promise<string | string[]> {
  return getFileType(p)
    .then((type) => {
      if (type === 'FILE') {
        return p;
      }

      if (type === 'DIRECTORY') {
        return fs.readdir(p);
      }

      return p;
    })
    .catch(() => {
      throw new Error('file system error');
    });
}

function getSize(p: string): Promise<number> {
  return getContents(p)
    .then((contents) => {
      if (!Array.isArray(contents)) {
        return fs.stat(p).then((stats) => stats.size);
      }

      const fileSIzeList = contents.map((file) => {
        const fullPath = path.join(p, file);

        return fs.stat(fullPath).then((stats) => stats.size);
      });

      return Promise.all(fileSIzeList).then((sizes) => sizes.reduce((acc, sum) => acc + sum, 0));
    })
    .catch(() => {
      throw new Error('file system error');
    });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//file type
getFileType(__dirname).then((type) => {
  console.log('File Type:', type);
});

//getting the contents of the folder
getContents(__dirname)
  .then((contents) => {
    console.log('Contents:', contents);
  })
  .catch((err) => console.log(err));

//folder size
getSize(__dirname)
  .then((contents) => {
    console.log('Contents:', contents);
  })
  .catch((err) => console.log(err));
