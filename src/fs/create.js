import { writeFile, access } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { constants } from "fs";

export const create = async () => {
  const pathToFile = join(
    dirname(fileURLToPath(import.meta.url)),
    "files/fresh.txt"
  );
  const content = "I am fresh and young";

  try {
    await access(pathToFile, constants.F_OK);
  } catch {
    return writeFile(pathToFile, content);
  }

  throw new Error("FS operation failed");
};
