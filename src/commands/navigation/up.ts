import { CommandResultType, PositionType } from "../../wsServer.types";

export const mouseUp = (
  position: PositionType,
  bias: string
): CommandResultType => {
  const newPosition = { ...position };

  newPosition.y += -+bias;

  if (newPosition.y < 0) {
    newPosition.y = 0;
  }

  return { position: newPosition };
};
