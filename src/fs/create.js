import { writeFile } from "fs/promises";
import { join } from "path";

import { exists, pathToDir } from "./shared.js";

export const create = async () => {
  const __dirname = pathToDir(import.meta.url);
  const pathToFile = join(__dirname, "files/fresh.txt");
  const content = "I am fresh and young";

  try {
    const isPathToFile = await exists(pathToFile);

    if (isPathToFile) {
      throw new Error("FS operation failed");
    }

    await writeFile(pathToFile, content);
  } catch (error) {
    console.error(error.message);
  }
};
