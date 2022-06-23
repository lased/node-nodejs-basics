import { createWebSocketStream, WebSocket } from "ws";
import robot from "robotjs";

import commands from "./commands";

const info = (text: string) => {
  console.info("========================================");
  console.info(`${text} Total - ${counter}`);
  console.info("========================================");
};
let counter = 0;

export const connection = (ws: WebSocket) => {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });

  duplex.on("data", async (data: Buffer) => {
    console.info(`\nReceived: ${data}\0`);
    try {
      const [command, ...args] = data.toString().split(" ");
      const result = await commands[command as keyof typeof commands](
        ...(args as [any, any])
      );

      let response = `${command} ${args.join(" ")}`;

      if (result?.position) {
        robot.moveMouse(result.position.x, result.position.y);
      }
      if (result?.data) {
        response = result.data;
        console.info(`Result: ${response}\0`);
      }

      duplex.write(response);
    } catch {
      duplex.write("Invalid_command_or_server_error");
    }
  });
  ws.on("close", () => {
    info("User disconnected.");
    duplex.destroy();
    counter--;
  });
  counter++;
  info("User connected.");
};
