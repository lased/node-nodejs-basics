import httpServer from "./staticServer";
import wsServer from "./wsServer";

process.on("SIGINT", () => {
  console.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.info("Closing websocket and static server...");
  console.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  httpServer.close();
  wsServer.close();
  process.exit(0);
});
