import { unlink } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const remove = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(__dirname, "files/fileToRemove.txt");

  try {
    await unlink(pathToFile);
  } catch {
    console.log(new Error("FS operation failed"));
  }
};
