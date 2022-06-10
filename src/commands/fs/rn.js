import { rename } from "node:fs/promises";
import { join } from "node:path";

import { isAccess } from "../../utils/fs.js";

export const rn = async (workdir, [sourceFilename, destFilename]) => {
  try {
    const pathToSource = join(workdir, sourceFilename);
    const pathToDest = join(workdir, destFilename);

    if (await isAccess(pathToDest)) {
      throw new Error(`rn: File already exists "${destFilename}"`);
    }

    await rename(pathToSource, pathToDest);
  } catch (error) {
    if (error.message.startsWith("rn:")) {
      throw error;
    }

    throw new Error(
      `rn: An error occurred while rename file "${sourceFilename}"`
    );
  }
};
