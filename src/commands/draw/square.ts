import robot from "robotjs";

import { CommandResultType } from "../../wsServer.types";

export const drawSquare = async (width: string): CommandResultType => {
  const { x, y } = robot.getMousePos();

  robot.mouseToggle("down");
  robot.mouseToggle("down");
  robot.moveMouseSmooth(x + +width, y);
  robot.moveMouseSmooth(x + +width, y + +width);
  robot.moveMouseSmooth(x, y + +width);
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle("up");
};
