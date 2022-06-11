import { stat } from "node:fs/promises";

import { unionPath } from "../../utils/fs.js";

export const cd = async (workdir, [pathToDir]) => {
  try {
    workdir = unionPath(workdir, pathToDir);

    const isDir = (await stat(workdir)).isDirectory();

    if (!isDir) {
      throw new Error();
    }

    return { workdir };
  } catch {
    throw new Error("Operation failed");
  }
};
