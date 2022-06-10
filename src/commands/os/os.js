import { EOL, cpus, homedir, userInfo, arch } from "node:os";

const params = {
  "--EOL": () => JSON.stringify(EOL),
  "--cpus": cpus,
  "--homedir": homedir,
  "--username": () => userInfo().username,
  "--architecture": arch,
};

export const os = (_, [param]) => {
  const data = params[param]?.();

  if (!data) {
    throw new Error(`Invalid flag ${(param && `"${param}"`) || ""}`);
  }
  if (param === "--cpus") {
    return {
      data: data.map((core) => ({
        model: core.model,
        speed: core.speed,
      })),
      outputType: "table",
    };
  }

  return { data };
};
