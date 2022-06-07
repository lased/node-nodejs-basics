import { join } from "node:path";

export const up = (workdir) => {
  workdir = join(workdir, "..");

  return { workdir };
};
