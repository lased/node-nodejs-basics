import { readdir } from "fs/promises";
import { join } from "path";

import { exists, pathToDir } from "./shared.js";

export const list = async () => {
  const pathToFilesDir = join(pathToDir(import.meta.url), "files");

  try {
    const isPathToFilesDir = await exists(pathToFilesDir);

    if (!isPathToFilesDir) {
      throw new Error("FS operation failed");
    }

    return readdir(pathToFilesDir);
  } catch (error) {
    console.error(error.message);
  }
};
