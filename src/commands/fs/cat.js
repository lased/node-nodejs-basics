import { createReadStream } from "node:fs";
import { join } from "node:path";

export const cat = (workdir, [pathToFile]) =>
  new Promise((resolve, reject) => {
    const stream = createReadStream(join(workdir, pathToFile), {
      encoding: "utf-8",
    });

    stream.pipe(process.stdout);
    stream.on("close", () => {
      resolve();
    });
    stream.on("error", () => {
      reject(
        new Error(`cat: An error occurred while reading file "${pathToFile}"`)
      );
    });
  });
