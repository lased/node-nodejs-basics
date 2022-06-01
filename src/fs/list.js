import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const list = async () => {
  const pathToDir = join(dirname(fileURLToPath(import.meta.url)), "files");

  try {
    console.log(await readdir(pathToDir));
  } catch {
    console.log(new Error("FS operation failed"));
  }
};
