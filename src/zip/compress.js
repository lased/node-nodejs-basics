import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

export const compress = async () => {
  const filename = "./files/fileToCompress.txt";
  const gzipFilename = "./files/archive.gz";
  const writeStream = createWriteStream(gzipFilename);
  const readStream = createReadStream(filename);
  const gzip = createGzip();

  readStream.pipe(gzip).pipe(writeStream);
};
