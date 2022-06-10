import { access } from "node:fs/promises";

import { unionPath } from "../../utils/fs.js";

export const cd = async (workdir, [pathToDir]) => {
  try {
    workdir = await unionPath(workdir, pathToDir);

    await access(workdir);
  } catch {
    throw new Error("cd: Operation failed");
  }

  return { workdir };
};
