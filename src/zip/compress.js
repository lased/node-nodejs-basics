import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";
import { join } from "path";

import { pathToDir } from "../shared.js";

export const compress = async () => {
  const __dirname = pathToDir(import.meta.url);
  const filename = "files/fileToCompress.txt";
  const gzipFilename = "files/archive.gz";
  const writeStream = createWriteStream(join(__dirname, gzipFilename));
  const readStream = createReadStream(join(__dirname, filename));
  const gzip = createGzip();

  return pipeline(readStream, gzip, writeStream)
    .then(() => {
      console.log(`\x1b[1;32mSuccess compress\x1b[0m`);
    })
    .catch((error) => {
      console.log(`\x1b[1;31m${error.message}\x1b[0m`);
    });
};
