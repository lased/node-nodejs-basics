import { unlink } from "fs/promises";
import { join } from "path";

import { exists, pathToDir } from "./shared.js";

export const remove = async () => {
  const __dirname = pathToDir(import.meta.url);
  const pathToFile = join(__dirname, "files/fileToRemove.txt");

  try {
    const isPathToFile = await exists(pathToFile);

    if (!isPathToFile) {
      throw new Error("FS operation failed");
    }

    await unlink(pathToFile);
  } catch (error) {
    console.error(error.message);
  }
};
