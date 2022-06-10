import { rm as remove, stat } from "node:fs/promises";
import { join } from "node:path";

export const rm = async (workdir, [filename]) => {
  try {
    const pathToFile = join(workdir, filename);
    const isFile = (await stat(pathToFile)).isFile();

    if (!isFile) {
      throw new Error(`rm: "${filename}" is't file`);
    }

    await remove(pathToFile);
  } catch (error) {
    if (error.message.startsWith("rm:")) {
      throw error;
    }

    throw new Error(
      `rm: An error occurred while remove file "${filename || ""}"`
    );
  }
};
