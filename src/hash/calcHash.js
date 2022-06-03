import { createReadStream } from "fs";
import { dirname, join } from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";

export const calculateHash = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const __filename = "files/fileToCalculateHashFor.txt";
  const readStream = createReadStream(join(__dirname, __filename));
  const hash = createHash("sha256");

  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  return new Promise((resolve) => {
    readStream.on("end", () => resolve(hash.digest("hex")));
  });
};
