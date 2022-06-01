import { createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const write = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const __filename = "files/fileToWrite.txt";
  const writeStream = createWriteStream(join(__dirname, __filename));

  console.log(
    "\x1b[1;34mStart your input in \x1b[30mstreams/files/fileToWrite.txt\x1b[0m \x1b[1;34mfile:\x1b[0m"
  );
  process.stdin.pipe(writeStream);
};
