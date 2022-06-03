import { access } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const exists = async (path) => {
  try {
    await access(path);

    return true;
  } catch {
    return false;
  }
};

export const pathToDir = (url) => {
  return join(dirname(fileURLToPath(url)));
};
