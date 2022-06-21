import robot from "robotjs";

import { CommandResultType, PositionType } from "../../wsServer.types";

export const mouseRight = (
  position: PositionType,
  bias: string
): CommandResultType => {
  const { width } = robot.getScreenSize();
  const newPosition = { ...position };

  newPosition.x += +bias;

  if (newPosition.x > width) {
    newPosition.x = width;
  }

  return { position: newPosition };
};
