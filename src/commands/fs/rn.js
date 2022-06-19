import { dirname, join, normalize } from "node:path";
import { rename } from "node:fs/promises";

import { concatPath, isAccess } from "../../utils/fs.js";

export const rn = async (workdir, pathToFile, newFilename) => {
  try {
    pathToFile = concatPath(workdir, normalize(pathToFile));

    const pathToDir = dirname(pathToFile);
    const pathToNewFile = join(pathToDir, newFilename);
    const isAccessToNewFile = await isAccess(pathToNewFile);

    if (isAccessToNewFile || dirname(pathToNewFile) !== pathToDir) {
      throw new Error();
    }

    await rename(pathToFile, pathToNewFile);
  } catch {
    throw new Error("Operation failed");
  }
};
