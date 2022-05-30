import { rename as renameFile, access } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { constants } from "fs";

export const rename = async () => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(currentDir, "files/wrongFilename.txt");
  const newPathToFile = join(currentDir, "files/properFilename.md");

  try {
    await access(pathToFile, constants.F_OK);
  } catch {
    throw new Error("FS operation failed");
  }
  try {
    await access(newPathToFile, constants.F_OK);
  } catch {
    return renameFile(pathToFile, newPathToFile);
  }

  throw new Error("FS operation failed");
};
