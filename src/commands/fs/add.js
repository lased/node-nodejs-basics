import { createWriteStream } from "node:fs";
import { join } from "node:path";

export const add = async (workdir, [newFilename]) =>
  new Promise((resolve, reject) => {
    const pathToFile = join(workdir, newFilename);
    const stream = createWriteStream(pathToFile, {
      flags: "wx",
    });

    stream.on("close", resolve);
    stream.on("error", () => {
      reject(new Error("Operation failed"));
    });
    stream.close();
  });
