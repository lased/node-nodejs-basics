import robot from "robotjs";

import { CommandResultType, PositionType } from "../../wsServer.types";

export const mouseDown = (
  position: PositionType,
  bias: string
): CommandResultType => {
  const { height } = robot.getScreenSize();
  const newPosition = { ...position };

  newPosition.y += +bias;

  if (newPosition.y > height) {
    newPosition.y = height;
  }

  return { position: newPosition };
};
