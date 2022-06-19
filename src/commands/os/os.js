import { EOL, cpus, homedir, userInfo, arch } from "node:os";

import { info } from "../../utils/color.js";

const params = {
  "--EOL": () => JSON.stringify(EOL),
  "--cpus": cpus,
  "--homedir": homedir,
  "--username": () => userInfo().username,
  "--architecture": arch,
};

export const os = (_, param) => {
  const data = params[param]?.();

  if (!data) {
    throw new Error("Operation failed");
  }
  if (param === "--cpus") {
    return {
      data: data.map((core) => ({
        model: core.model,
        speed: `${(core.speed / 1000).toFixed(1)} GHz`,
      })),
      outputType: "table",
    };
  }

  return { data: info(data) };
};
