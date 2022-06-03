import { rename as renameFile } from "fs/promises";
import { join } from "path";

import { exists, pathToDir } from "../shared.js";

export const rename = async () => {
  const filesDir = join(pathToDir(import.meta.url), "files");
  const newPathToFile = join(filesDir, "properFilename.md");
  const pathToFile = join(filesDir, "wrongFilename.txt");

  try {
    const isNewPathToFile = await exists(newPathToFile);
    const isPathToFile = await exists(pathToFile);

    if (isNewPathToFile || !isPathToFile) {
      throw new Error("FS operation failed");
    }

    await renameFile(pathToFile, newPathToFile);
  } catch (error) {
    console.error(error.message);
  }
};
