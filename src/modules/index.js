import { unknownObject, createMyServer } from "./cjsToEsm.mjs";

console.log("Unknown object:", unknownObject);

console.log("\n\x1b[1;33mServer started on localhost:8000\x1b[0m");
createMyServer.listen(8000);
