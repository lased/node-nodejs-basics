import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

import { shortenString } from "../../utils/string.js";
import { calculateSize } from "../../utils/fs.js";

export const ls = async (workdir) => {
  const data = [];

  try {
    const list = await readdir(workdir);
    let mapData = await Promise.all(
      list.map(async (item) => {
        try {
          const info = await stat(join(workdir, item));

          return {
            type: info.isFile() ? "File" : "Directory",
            name: shortenString(item, 64),
            size: info.isFile() ? calculateSize(info.size) : "",
          };
        } catch {
          return null;
        }
      })
    );

    mapData = mapData.filter((item) => item);
    mapData.sort((a, b) => (a.type < b.type ? -1 : 1));
    data.push(...mapData);
  } catch {
    throw new Error("Operation failed");
  }

  return { data, outputType: "table" };
};
