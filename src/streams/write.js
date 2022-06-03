import { createWriteStream } from "fs";
import { join } from "path";

import { pathToDir } from "../shared.js";

export const write = async () => {
  const __dirname = pathToDir(import.meta.url);
  const __filename = "files/fileToWrite.txt";
  const writeStream = createWriteStream(join(__dirname, __filename));

  console.log(
    "\x1b[1;34mStart your input in \x1b[30mstreams/files/fileToWrite.txt\x1b[0m \x1b[1;34mfile:\x1b[0m"
  );
  process.stdin.pipe(writeStream);
};
