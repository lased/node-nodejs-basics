// Можно JSON импортировать используя --experimental-json-modules или через readFile
import { createServer as createServerHttp } from "http";
import { release, version } from "os";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import * as path from "path";

import "./files/c.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = JSON.parse(readFileSync("./files/a.json"));
} else {
  unknownObject = JSON.parse(readFileSync("./files/b.json"));
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

export { unknownObject, createMyServer };
