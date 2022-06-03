import { createReadStream } from "fs";
import { join } from "path";

import { pathToDir } from "../shared.js";

export const read = async () => {
  const __dirname = pathToDir(import.meta.url);
  const __filename = "files/fileToRead.txt";
  const readStream = createReadStream(join(__dirname, __filename));

  return new Promise((res) => {
    readStream
      .on("data", (chunk) => {
        process.stdout.write(chunk);
      })
      .on("close", () => res())
      .on("error", (error) => {
        console.log(`\x1b[1;31m${error.message}\x1b[0m`);
      });
  });
};
