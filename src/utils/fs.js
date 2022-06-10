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
export const unionPath = async (source, dest) => {
  try {
    if (isAbsolute(dest)) {
      const isDir = (await stat(dest)).isDirectory();

      if (!isDir) {
        return dirname(dest);
      } else {
        return dest;
      }
    } else {
      return join(source, dest);
    }
  } catch (error) {
    throw error;
  }
};
