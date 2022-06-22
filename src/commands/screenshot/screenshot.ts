import { Buffer } from "buffer";
import robot from "robotjs";
import jimp from "jimp";

import { CommandResultType } from "../../wsServer.types";

const size = 100;

export const screenshot = async (): CommandResultType => {
  const { height, width } = robot.getScreenSize();
  let { x, y } = robot.getMousePos();

  if (x + size > width) {
    x = width - size;
  }
  if (x - size < 0) {
    x = size;
  }
  if (y + size > height) {
    y = height - size;
  }
  if (y - size < 0) {
    y = size;
  }

  const bitMap = robot.screen.capture(x - size, y - size, size * 2, size * 2);
  const img = new jimp(size * 2, size * 2);

  img.bitmap.data = bitMap.image;

  const base64 = await img.getBufferAsync(jimp.MIME_PNG);

  return { data: `prnt_scrn ${base64.toString("base64")}` };
};
