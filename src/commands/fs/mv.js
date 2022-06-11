import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { basename, join } from "node:path";
import { rm } from "node:fs/promises";

import { concatPath } from "../../utils/fs.js";

export const mv = async (workdir, [pathToFile, pathToNewDir]) => {
  try {
    pathToNewDir = concatPath(workdir, pathToNewDir);
    pathToFile = concatPath(workdir, pathToFile);

    const filename = basename(pathToFile);
    const pathToNewFile = join(pathToNewDir, filename);
    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(pathToNewFile, { flags: "wx" });

    await pipeline(readStream, writeStream);
    await rm(pathToFile);
  } catch {
    throw new Error("Operation failed");
  }
};
