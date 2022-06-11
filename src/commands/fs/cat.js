import { createReadStream } from "node:fs";

import { concatPath } from "../../utils/fs.js";

export const cat = (workdir, pathToFile) =>
  new Promise((resolve, reject) => {
    pathToFile = concatPath(workdir, pathToFile);

    const stream = createReadStream(pathToFile, {
      encoding: "utf-8",
    });

    stream.pipe(process.stdout);
    stream.on("close", resolve);
    stream.on("error", () => {
      reject(new Error("Operation failed"));
    });
  });
