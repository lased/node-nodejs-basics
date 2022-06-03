import { mkdir, stat, readdir, copyFile } from "fs/promises";
import { join } from "path";

import { exists, pathToDir } from "../shared.js";

const recursiveCopy = async (pathToSource, pathToDest) => {
  const files = await readdir(pathToSource);

  for (const file of files) {
    const pathToSourceFile = join(pathToSource, file);
    const pathToDestFile = join(pathToDest, file);
    const isDir = (await stat(pathToSourceFile)).isDirectory();

    if (isDir) {
      await mkdir(pathToDestFile);
      await recursiveCopy(pathToSourceFile, pathToDestFile);
    } else {
      await copyFile(pathToSourceFile, pathToDestFile);
    }
  }
};

export const copy = async () => {
  const __dirname = pathToDir(import.meta.url);
  const pathToDest = join(__dirname, "files_copy");
  const pathToSource = join(__dirname, "files");

  try {
    const isPathToDest = await exists(pathToDest);
    const isPathToSource = await exists(pathToSource);

    if (!isPathToSource || isPathToDest) {
      throw new Error("FS operation failed");
    }

    await mkdir(pathToDest);
    await recursiveCopy(pathToSource, pathToDest);
  } catch (error) {
    console.error(error.message);
  }
};
