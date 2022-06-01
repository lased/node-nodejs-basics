import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createGunzip } from "zlib";

export const decompress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filename = "files/fileToCompress.txt";
  const gzipFilename = "files/archive.gz";
  const readStream = createReadStream(join(__dirname, gzipFilename));
  const writeStream = createWriteStream(join(__dirname, filename));
  const ungzip = createGunzip();

  pipeline(readStream, ungzip, writeStream)
    .then(() => {
      console.log(`\x1b[1;32mSuccess decompress\x1b[0m`);
    })
    .catch((error) => {
      console.log(`\x1b[1;31m${error.message}\x1b[0m`);
    });
};
