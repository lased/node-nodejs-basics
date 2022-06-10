import { join, resolve } from "node:path";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

import { info } from "../../utils/color.js";

const hash = (workdir, [filename]) =>
  new Promise(async (resolve, reject) => {
    try {
      const pathToFile = join(workdir, filename);
      const isFile = (await stat(pathToFile)).isFile();

      if (!isFile) {
        throw new Error(`hash: "${filename}" is't file`);
      }

      const readStream = createReadStream(pathToFile);
      const hash = createHash("sha256");

      readStream.on("data", hash.update);
      readStream.on("close", () => {
        console.info(info(hash.digest("hex")));
        resolve();
      });
    } catch (error) {
      if (error.message.startsWith("hash:")) {
        reject(error);
      }

      reject(
        new Error(
          `hash: An error occurred while hashing file "${filename || ""}"`
        )
      );
    }
  });

export default { hash };
