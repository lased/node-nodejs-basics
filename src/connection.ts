import { WebSocket } from "ws";
import robot from "robotjs";

import commands from "./commands";

const position = { x: 0, y: 0 };

export const connection = (ws: WebSocket) => {
  ws.on("message", async (data: Buffer) => {
    try {
      const [command, ...args] = data.toString().split(" ");
      const result = commands[command as keyof typeof commands](
        position,
        ...(args as [any])
      );
      let response = `${command} ${args.join(" ")}`;

      if (result?.position) {
        position.x = result.position.x;
        position.y = result.position.y;
        robot.moveMouse(position.x, position.y);
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
