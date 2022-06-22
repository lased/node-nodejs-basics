import robot from "robotjs";

import { CommandResultType } from "../../wsServer.types";

export const mouseLeft = (bias: string): CommandResultType => {
  const position = robot.getMousePos();
  const newPosition = { ...position };

  newPosition.x += -+bias;

  if (newPosition.x < 0) {
    newPosition.x = 0;
  }

  return { position: newPosition };
};
