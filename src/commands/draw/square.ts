import robot from "robotjs";

import { CommandResultType } from "../../wsServer.types";
import { drawLine } from "./line";

export const drawSquare = (width: string): CommandResultType => {
  robot.mouseToggle("down");
  drawLine(1, 0, +width, +width);
  drawLine(0, 1, +width, +width);
  drawLine(-1, 0, +width, +width);
  drawLine(0, -1, +width, +width);
  robot.mouseToggle("up");
};
