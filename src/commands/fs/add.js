import { createWriteStream } from "node:fs";
import { join } from "node:path";

export const add = (workdir, [newFilename]) =>
  new Promise((resolve, reject) => {
    const stream = createWriteStream(join(workdir, newFilename), {
      flags: "wx",
    });

    stream.on("close", () => {
      resolve();
    });
    stream.on("error", () => {
      reject(
        new Error(`add: An error occurred while writing file "${newFilename}"`)
      );
    });
    stream.close();
  });
