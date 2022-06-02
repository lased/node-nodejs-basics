import { writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const create = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(__dirname, "files/fresh.txt");
  const content = "I am fresh and young";

  try {
    await writeFile(pathToFile, content, { flag: "wx" });
  } catch {
    console.log(new Error("FS operation failed"));
  }
};
