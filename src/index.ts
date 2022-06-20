import { WebSocketServer } from "ws";

const PORT = Number(process.env.PORT) || 6000;

const wsServer = new WebSocketServer({
  port: PORT,
});

wsServer.on("listening", () => {
  console.info("========================================");
  console.info(`Server running on port ${PORT}`);
  console.info("========================================");
});

wsServer.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("received: %s", data);
  });

  ws.send("something");
});
