import { remove } from "./delete.js";
import { create } from "./create.js";
import { rename } from "./rename.js";
import { copy } from "./copy.js";
import { list } from "./list.js";
import { read } from "./read.js";

console.log("\x1b[1;33mStart delete.js...\x1b[0m");
await remove();
console.log("\x1b[1;33mFinish delete.js...\x1b[0m\n");

console.log("\x1b[1;33mStart create.js...\x1b[0m");
await create();
console.log("\x1b[1;33mFinish create.js...\x1b[0m\n");

console.log("\x1b[1;33mStart rename.js...\x1b[0m");
await rename();
console.log("\x1b[1;33mFinish rename.js...\x1b[0m\n");

console.log("\x1b[1;33mStart copy.js...\x1b[0m");
await copy();
console.log("\x1b[1;33mFinish copy.js...\x1b[0m\n");

console.log("\x1b[1;33mStart list.js...\x1b[0m");
console.log(await list());
console.log("\x1b[1;33mFinish list.js...\x1b[0m\n");

console.log("\x1b[1;33mStart read.js...\x1b[0m");
console.log(await read());
console.log("\x1b[1;33mFinish read.js...\x1b[0m\n");
