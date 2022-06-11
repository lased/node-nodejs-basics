import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream/promises";

import { concatPath } from "../../utils/fs.js";

export const compress = async (workdir, [pathToFile, pathToDest]) => {
  try {
    pathToFile = concatPath(workdir, pathToFile);
    pathToDest = concatPath(workdir, pathToDest);

    const writeStream = createWriteStream(pathToDest, { flags: "wx" });
    const readStream = createReadStream(pathToFile);
    const brotliCompress = createBrotliCompress();

    await pipeline(readStream, brotliCompress, writeStream);
  } catch {
    throw new Error("Operation failed");
  }
};
