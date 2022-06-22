import { WebSocket } from "ws";
import robot from "robotjs";

import commands from "./commands";

export const connection = (ws: WebSocket) => {
  ws.on("message", (data: Buffer) => {
    try {
      const [command, ...args] = data.toString().split(" ");
      const result = commands[command as keyof typeof commands](
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
    } catch {
      ws.send("Invalid_command");
    }
  });
};
