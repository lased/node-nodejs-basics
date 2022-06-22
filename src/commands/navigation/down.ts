import robot from "robotjs";

import { CommandResultType } from "../../wsServer.types";

export const mouseDown = (bias: string): CommandResultType => {
  const { height } = robot.getScreenSize();
  const position = robot.getMousePos();
  const newPosition = { ...position };

  newPosition.y += +bias;

  if (newPosition.y > height) {
    newPosition.y = height;
  }

  return { position: newPosition };
};
