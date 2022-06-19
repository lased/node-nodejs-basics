import { rm as remove } from "node:fs/promises";

import { concatPath } from "../../utils/fs.js";

export const rm = async (workdir, pathToFile) => {
  try {
    pathToFile = concatPath(workdir, pathToFile);
    await remove(pathToFile);
  } catch {
    throw new Error("Operation failed");
  }
};
