import { pipeline } from "node:stream/promises";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";

import { concatPath } from "../../utils/fs.js";
import { info } from "../../utils/color.js";

const hash = async (workdir, [pathToFile]) => {
  try {
    pathToFile = concatPath(workdir, pathToFile);

    const readStream = createReadStream(pathToFile);
    const hashStream = createHash("sha256");

    await pipeline(readStream, hashStream);

    return { data: info(hashStream.digest("hex")) };
  } catch {
    throw new Error("Operation failed");
  }
};

export default { hash };
