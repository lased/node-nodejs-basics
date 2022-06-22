import robot from "robotjs";

import { CommandResultType } from "../../wsServer.types";

export const mousePosition = (): CommandResultType => {
  const position = robot.getMousePos();
  const data = `mouse_position ${position.x},${position.y}`;

  return { data };
};
