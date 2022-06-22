import robot from "robotjs";

export const drawLine = (
  dx: number,
  dy: number,
  width: number,
  height: number
) => {
  const length = dx ? +width : +height;
  const position = robot.getMousePos();

  for (let index = 0; index < length; index++) {
    const x = position.x + dx * index;
    const y = position.y + dy * index;

    robot.moveMouse(x, y);
  }
};
