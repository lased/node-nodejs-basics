import { Transform } from "stream";
import { Buffer } from "buffer";

export const transform = async () => {
  const { stdin, stdout } = process;
  const transform = new Transform({
    transform: (chunk, _, callback) => {
      const reverseChunk = chunk
        .toString()
        .split("")
        .reverse()
        .slice(1)
        .join("");

      console.log("\x1b[1;33mReverse input:\x1b[0m");
      callback(null, Buffer.from(reverseChunk + "\n\n"));
    },
  });

  console.log("\x1b[1;34mStart your input:\x1b[0m");
  stdin.pipe(transform).pipe(stdout);
};
