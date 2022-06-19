import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";

import { concatPath } from "../../utils/fs.js";

export const decompress = async (workdir, pathToFile, pathToDest) => {
  try {
    pathToFile = concatPath(workdir, pathToFile);
    pathToDest = concatPath(workdir, pathToDest);

    const writeStream = createWriteStream(pathToDest, { flags: "wx" });
    const readStream = createReadStream(pathToFile);
    const brotliCompress = createBrotliDecompress();

    await pipeline(readStream, brotliCompress, writeStream);
  } catch (error) {
    console.log(error);
    throw new Error("Operation failed");
  }
};
