import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGunzip } from "zlib";
import { join } from "path";

import { pathToDir } from "../shared.js";

export const decompress = async () => {
  const __dirname = pathToDir(import.meta.url);
  const filename = "files/fileToCompress.txt";
  const gzipFilename = "files/archive.gz";
  const readStream = createReadStream(join(__dirname, gzipFilename));
  const writeStream = createWriteStream(join(__dirname, filename));
  const ungzip = createGunzip();

  return pipeline(readStream, ungzip, writeStream)
    .then(() => {
      console.log(`\x1b[1;32mSuccess decompress\x1b[0m`);
    })
    .catch((error) => {
      console.log(`\x1b[1;31m${error.message}\x1b[0m`);
    });
};
