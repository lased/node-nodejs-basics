import { dirname, isAbsolute, join } from "node:path";
import { access, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const pathToDir = (url) => dirname(fileURLToPath(url));
export const isAccess = async (path) => {
  try {
    await access(path);

    return true;
  } catch {
    return false;
  }
};
export const unionPath = (source, dest) => {
  if (isAbsolute(dest)) {
    return dest;
  }

  return join(source, dest);
};
