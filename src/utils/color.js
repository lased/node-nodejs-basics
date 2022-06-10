export const getColoredText = (text, color, style = 0) => {
  return `\x1B[${style};${color}m${text}\x1B[0m`;
};

export const info = (text) => {
  return getColoredText(text, TERMINAL_COLOR.BLUES, TERMINAL_STYLE.BOLD);
};

export const error = (text) => {
  return getColoredText(text, TERMINAL_COLOR.RED, TERMINAL_STYLE.BOLD);
};

export const success = (text) => {
  return getColoredText(text, TERMINAL_COLOR.GREEN, TERMINAL_STYLE.BOLD);
};

export const warning = (text) => {
  return getColoredText(text, TERMINAL_COLOR.YELLOW, TERMINAL_STYLE.BOLD);
};

export const TERMINAL_STYLE = {
  NORMAL: 0,
  BOLD: 1,
  UNDERLINE: 4,
  FLASH: 5,
  INVERT: 7,
};

export const TERMINAL_COLOR = {
  BLACK: 30,
  RED: 31,
  GREEN: 32,
  YELLOW: 33,
  BLUE: 34,
  PURPLE: 35,
  BLUES: 36,
  WHITE: 37,
};
