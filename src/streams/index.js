import { transform } from "./transform.js";
import { write } from "./write.js";
import { read } from "./read.js";

const modules = {
  transform,
  write,
  read,
};

modules[process.argv[2]]();
