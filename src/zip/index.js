import { compress } from "./compress.js";
import { decompress } from "./decompress.js";

console.log("\x1b[1;33mStart compress.js...\x1b[0m");
await compress();
console.log("\x1b[1;33mFinish compress.js...\x1b[0m\n");

console.log("\x1b[1;33mStart decompress.js...\x1b[0m");
await decompress();
console.log("\x1b[1;33mFinish decompress.js...\x1b[0m\n");
