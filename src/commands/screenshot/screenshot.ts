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
  let pos = 0;

  img.scan(0, 0, img.bitmap.width, img.bitmap.height, (_, __, idx) => {
    img.bitmap.data[idx + 2] = bitMap.image.readUInt8(pos++);
    img.bitmap.data[idx + 1] = bitMap.image.readUInt8(pos++);
    img.bitmap.data[idx + 0] = bitMap.image.readUInt8(pos++);
    img.bitmap.data[idx + 3] = bitMap.image.readUInt8(pos++);
  });

  const buffer = await img.getBufferAsync(jimp.MIME_PNG);

  return { data: `prnt_scrn ${buffer.toString("base64")}` };
};
