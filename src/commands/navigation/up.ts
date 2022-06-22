import robot from "robotjs";

import { CommandResultType } from "../../wsServer.types";

export const mouseUp = async (bias: string): CommandResultType => {
  const position = robot.getMousePos();
  const newPosition = { ...position };

  newPosition.y += -+bias;

  if (newPosition.y < 0) {
    newPosition.y = 0;
  }

  return { position: newPosition };
};
