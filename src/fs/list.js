import { readdir, access } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { constants } from "fs";

export const list = async () => {
  const pathToDIr = join(dirname(fileURLToPath(import.meta.url)), "files");

  try {
    await access(pathToDIr, constants.F_OK);
    console.log(await readdir(pathToDIr));
  } catch {
    throw new Error("FS operation failed");
  }
};
