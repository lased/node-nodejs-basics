export const parseProcessArgv = () => {
  const commands = process.argv.slice(2);
  const commandsObj = {};

  commands.forEach((command) => {
    const [key, value] = command.split("=");

    if (!key.startsWith("--") || !value) {
      throw new Error(`Invalid "${key}" options`);
    }

    commandsObj[key.slice(2)] = value;
  });

  return commandsObj;
};
export const parseCommand = (string) => {
  const formatString = string.trim().replaceAll("'", '"');
  const countQuotes = formatString
    .split("")
    .reduce((acc, char) => acc + +(char === '"'), 0);

  if (countQuotes % 2) return [];

  const result = [];
  let quote = false;
  let start = 0;

  for (let index = 0; index < formatString.length; index++) {
    const char = formatString[index];
    const isLastChar = index === formatString.length - 1;

    if (char === '"') {
      quote = !quote;
    }
    if ((char === " " || isLastChar) && !quote) {
      result.push(
        formatString.slice(start, index + +isLastChar).replaceAll('"', "")
      );
      start = index + 1;
    }
  }

  return result;
};
