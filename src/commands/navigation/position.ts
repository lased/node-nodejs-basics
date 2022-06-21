import { CommandResultType, PositionType } from "../../wsServer.types";

export const mousePosition = (position: PositionType): CommandResultType => {
  const data = `mouse_position ${position.x},${position.y}`;

  return { data };
};
