import { cp, access } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { constants } from "fs";

export const copy = async () => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const pathToCopyFiles = join(currentDir, "files_copy");
  const pathToFiles = join(currentDir, "files");

  try {
    await access(pathToFiles, constants.F_OK);
  } catch {
    throw new Error("FS operation failed");
  }
  try {
    await access(pathToCopyFiles, constants.F_OK);
  } catch {
    return cp(pathToFiles, pathToCopyFiles, { recursive: true });
  }

  console.log(new Error("FS operation failed"));
};
