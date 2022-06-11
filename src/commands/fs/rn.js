import { rename } from "node:fs/promises";
import { dirname, join } from "node:path";

import { concatPath, isAccess } from "../../utils/fs.js";

export const rn = async (workdir, [pathToFile, newFilename]) => {
  try {
    pathToFile = concatPath(workdir, pathToFile);

    const pathToDir = dirname(pathToFile);
    const pathToNewFile = join(pathToDir, newFilename);
    const isAccessToNewFile = await isAccess(pathToNewFile);

    if (isAccessToNewFile) {
      throw new Error();
    }

    await rename(pathToFile, pathToNewFile);
  } catch {
    throw new Error("Operation failed");
  }
};
