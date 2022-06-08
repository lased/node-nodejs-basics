import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

export const pathToDir = (url) => dirname(fileURLToPath(url));
