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

      callback(null, Buffer.from(reverseChunk + "\n"));
    },
  });

  stdin.pipe(transform).pipe(stdout);
};
