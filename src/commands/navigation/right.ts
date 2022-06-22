import robot from "robotjs";

import { CommandResultType } from "../../wsServer.types";

export const mouseRight = async (bias: string): CommandResultType => {
  const { width } = robot.getScreenSize();
  const position = robot.getMousePos();
  const newPosition = { ...position };

  newPosition.x += +bias;

  if (newPosition.x > width) {
    newPosition.x = width;
  }

  return { position: newPosition };
};
