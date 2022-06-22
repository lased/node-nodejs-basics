import { WebSocketServer } from "ws";
import { connection } from "./connection";

const PORT = 8080;

const wsServer = new WebSocketServer({
  port: PORT,
});


wsServer.on("connection", connection);
wsServer.on("listening", () => {
  console.info("========================================");
  console.info(`Websocket server running on port ${PORT}`);
  console.info("========================================");
});
