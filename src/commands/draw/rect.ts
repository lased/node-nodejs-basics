import robot from "robotjs";

import { CommandResultType } from "../../wsServer.types";

export const drawRect = async (
  width: string,
  height: string
): CommandResultType => {
  const { x, y } = robot.getMousePos();

  robot.mouseToggle("down");
  robot.moveMouseSmooth(x + +width, y);
  robot.moveMouseSmooth(x + +width, y + +height);
  robot.moveMouseSmooth(x, y + +height);
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle("up");
};
