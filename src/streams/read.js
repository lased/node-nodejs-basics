import { createReadStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const __filename = "files/fileToRead.txt";
  const readStream = createReadStream(join(__dirname, __filename));

  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });
};
