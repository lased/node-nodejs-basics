import { fileURLToPath } from "url";
import { dirname } from "path";

export const pathToDir = (url) => dirname(fileURLToPath(url));
