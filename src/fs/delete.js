import { unlink, access } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { constants } from "fs";

export const remove = async () => {
  const pathToFile = join(
    dirname(fileURLToPath(import.meta.url)),
    "files/fileToRemove.txt"
  );

  try {
    await access(pathToFile, constants.F_OK);
    await unlink(pathToFile);
  } catch {
    throw new Error("FS operation failed");
  }
};
