import { mkdir, stat, readdir, copyFile, access } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const recursiveCopy = async (pathToSource, pathToDest) => {
  const files = await readdir(pathToSource);

  for (const file of files) {
    const pathToSourceFile = join(pathToSource, file);
    const pathToDestFile = join(pathToDest, file);
    const isDir = (await stat(pathToSourceFile)).isDirectory();

    if (isDir) {
      await mkdir(pathToDestFile);
      await recursiveCopy(pathToSourceFile, pathToDestFile);
    } else {
      await copyFile(pathToSourceFile, pathToDestFile);
    }
  }
};

export const copy = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToDest = join(__dirname, "files_copy");
  const pathToSource = join(__dirname, "files");

  try {
    await access(pathToSource);
    await mkdir(pathToDest);
    await recursiveCopy(pathToSource, pathToDest);
  } catch {
    console.log(new Error("FS operation failed"));
  }
};
