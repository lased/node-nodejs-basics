import { copyFile, rm, stat } from "node:fs/promises";
import { join } from "node:path";

import { unionPath } from "../../utils/fs.js";

export const mv = async (workdir, [filename, dirname]) => {
  try {
    const newPath = await unionPath(workdir, dirname);
    const pathToFile = join(workdir, filename);
    const isFile = (await stat(pathToFile)).isFile();

    if (!isFile) {
      throw new Error(`mv: "${filename}" is't file`);
    }

    await copyFile(pathToFile, join(newPath, filename));
    await rm(pathToFile);
  } catch (error) {
    if (error.message.startsWith("mv:")) {
      throw error;
    }

    throw new Error(`mv: An error occurred while moving file "${filename}"`);
  }
};
