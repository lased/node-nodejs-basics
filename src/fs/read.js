import { readFile, access } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { constants } from "fs";

export const read = async () => {
  const pathToFile = join(
    dirname(fileURLToPath(import.meta.url)),
    "files/fileToRead.txt"
  );

  try {
    await access(pathToFile, constants.F_OK);
    console.log(await readFile(pathToFile, { encoding: "utf-8" }));
  } catch {
    throw new Error("FS operation failed");
  }
};
