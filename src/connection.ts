import { WebSocket } from "ws";
import robot from "robotjs";

import commands from "./commands";

export const connection = (ws: WebSocket) => {
  ws.on("message", async (data: Buffer) => {
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
      }

      ws.send(response);
    } catch (e) {
      console.log(e);

      ws.send("Invalid_command_or_server_error");
    }
  });
};
