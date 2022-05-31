import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";

export const decompress = async () => {
  const filename = "./files/fileToCompress.txt";
  const gzipFilename = "./files/archive.gz";
  const readStream = createReadStream(gzipFilename);
  const writeStream = createWriteStream(filename);
  const ungzip = createGunzip();

  readStream.pipe(ungzip).pipe(writeStream);
};
