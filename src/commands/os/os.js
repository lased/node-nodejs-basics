// Operating system info (prints following information in console)
// Get EOL (default system End-Of-Line)
// os --EOL
// Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
// os --cpus
// Get home directory:
// os --homedir
// Get current system user name (Do not confuse with the username that is set when the application starts)
// os --username
// Get CPU architecture for which Node.js binary has compiled
// os --architecture
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
