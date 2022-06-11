import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";

import { unionPath } from "../../utils/fs.js";

export const decompress = async (workdir, [pathToFile, pathToDest]) => {
  try {
    pathToFile = unionPath(workdir, pathToFile);
    pathToDest = unionPath(workdir, pathToDest);

    const writeStream = createWriteStream(pathToDest, { flags: "wx" });
    const readStream = createReadStream(pathToFile);
    const brotliCompress = createBrotliDecompress();

    await pipeline(readStream, brotliCompress, writeStream);
  } catch (error) {
    console.log(error);
    throw new Error("Operation failed");
  }
};
