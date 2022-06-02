import { rename as renameFile, readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const rename = async () => {
  const filesDir = join(dirname(fileURLToPath(import.meta.url)), "files");
  const filenameFrom = "wrongFilename.txt";
  const filenameTo = "properFilename.md";
  const newPathToFile = join(filesDir, filenameTo);
  const pathToFile = join(filesDir, filenameFrom);

  try {
    const files = await readdir(filesDir);

    if (files.includes(filenameFrom) && !files.includes(filenameTo)) {
      return renameFile(pathToFile, newPathToFile);
    }

    throw new Error("Oops");
  } catch {
    console.log(new Error("FS operation failed"));
  }
};
