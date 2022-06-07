import { join, isAbsolute, dirname } from "node:path";
import { stat, access } from "node:fs/promises";

export const cd = async (workdir, [pathToDir]) => {
  try {
    if (isAbsolute(pathToDir)) {
      const isDir = (await stat(pathToDir)).isDirectory();

      if (!isDir) {
        pathToDir = dirname(pathToDir);
      } else {
        workdir = pathToDir;
      }
    } else {
      workdir = join(workdir, pathToDir);
    }

    await access(workdir);
  } catch {
    throw new Error("Operation failed");
  }

  return { workdir };
};
