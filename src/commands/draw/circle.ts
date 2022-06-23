import robot from "robotjs";

import { CommandResultType } from "../../wsServer.types";

export const drawCircle = async (radius: string): CommandResultType => {
  const position = robot.getMousePos();

  robot.mouseToggle("down");
  for (let index = 0; index <= Math.PI * 2; index += 0.02) {
    const x = position.x + +radius * Math.cos(index) - +radius;
    const y = position.y + +radius * Math.sin(index);

    robot.moveMouse(x, y);
  }
  robot.mouseToggle("up");
};
