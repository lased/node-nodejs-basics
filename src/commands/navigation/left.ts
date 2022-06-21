import { CommandResultType, PositionType } from "../../wsServer.types";

export const mouseLeft = (
  position: PositionType,
  bias: string
): CommandResultType => {
  const newPosition = { ...position };

  newPosition.x += -+bias;

  if (newPosition.x < 0) {
    newPosition.x = 0;
  }

  return { position: newPosition };
};
