import { readFile } from "fs/promises";
import { join } from "path";

import { pathToDir, exists } from "./shared.js";

export const read = async () => {
  const pathToFile = join(pathToDir(import.meta.url), "files/fileToRead.txt");

  try {
    const isPathToFile = await exists(pathToFile);

    if (!isPathToFile) {
      throw new Error("FS operation failed");
    }

    return readFile(pathToFile, { encoding: "utf-8" });
  } catch (error) {
    console.error(error.message);
  }
};
