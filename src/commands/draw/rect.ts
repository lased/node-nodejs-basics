import robot from "robotjs";

import { CommandResultType } from "../../wsServer.types";
import { drawLine } from "./line";

export const drawRect = async (
  width: string,
  height: string
): CommandResultType => {
  robot.mouseToggle("down");
  drawLine(1, 0, +width, +height);
  drawLine(0, 1, +width, +height);
  drawLine(-1, 0, +width, +height);
  drawLine(0, -1, +width, +height);
  robot.mouseToggle("up");
};
