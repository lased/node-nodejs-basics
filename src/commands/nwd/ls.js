import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export const ls = async (workdir) => {
  const data = [];

  try {
    const list = await readdir(workdir);
    const mapData = await Promise.all(
      list.map(async (item) => {
        try {
          const info = await stat(join(workdir, item));

          // TODO: constrains length to 64 and parse bytes
          return {
            type: info.isFile() ? "File" : "Directory",
            name: item,
            size: info.size + " bytes",
          };
        } catch {
          return null;
        }
      })
    );

    data.push(...mapData.filter((item) => item));
  } catch {
    throw new Error("ls: Operation failed");
  }

  return { data, outputType: "table" };
};
