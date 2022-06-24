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
    const [command, ...args] = data.toString().split(" ");

    console.info(`\nReceived: ${data}`);
    try {
      const result = await commands[command as keyof typeof commands](
        ...(args as [any, any])
      );

      let response;

      if (result?.position) {
        robot.moveMouse(result.position.x, result.position.y);
      }
      if (result?.data) {
        response = result.data;
      }

      console.info(
        `Result: ${response ? response : command + " completed successfully"}`
      );
      duplex.write(response || command);
    } catch {
      console.info("Result: Error");
      console.info(`Result: ${command} ended with an error`);
      duplex.write("Invalid_command_or_server_error");
    }
  });
  ws.on("close", () => {
    counter--;
    info("User disconnected.");
    duplex.destroy();
  });
  counter++;
  info("User connected.");
};
