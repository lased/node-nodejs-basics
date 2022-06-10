import { copyFile, stat } from "node:fs/promises";
import { join } from "node:path";

import { unionPath } from "../../utils/fs.js";

export const cp = async (workdir, [filename, dirname]) => {
  try {
    const newPath = await unionPath(workdir, dirname);
    const pathToFile = join(workdir, filename);
    const isFile = (await stat(pathToFile)).isFile();

    if (!isFile) {
      throw new Error(`cp: "${filename}" is't file`);
    }

    await copyFile(pathToFile, join(newPath, filename));
  } catch (error) {
    if (error.message.startsWith("cp:")) {
      throw error;
    }
    console.log(error.message);
    throw new Error(
      `cp: An error occurred while copying file "${filename || ""}"`
    );
  }
};
