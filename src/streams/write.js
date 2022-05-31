import { createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const write = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const __filename = "files/fileToWrite.txt";
  const writeStream = createWriteStream(join(__dirname, __filename));

  process.stdin.pipe(writeStream);
};
