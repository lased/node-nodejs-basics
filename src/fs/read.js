import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const read = async () => {
  const pathToFile = join(
    dirname(fileURLToPath(import.meta.url)),
    "files/fileToRead.txt"
  );

  try {
    console.log(await readFile(pathToFile, { encoding: "utf-8" }));
  } catch {
    console.log(new Error("FS operation failed"));
  }
};
