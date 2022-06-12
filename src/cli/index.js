import { parseArgs } from "./args.js";
import { parseEnv } from "./env.js";

console.log("\x1b[1;33mStart args.js...\x1b[0m");
parseArgs();
console.log("\x1b[1;33mFinish args.js...\x1b[0m\n");

console.log("\x1b[1;33mStart env.js...\x1b[0m");
parseEnv();
console.log("\x1b[1;33mFinish env.js...\x1b[0m\n");
