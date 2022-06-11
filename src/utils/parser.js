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
  const [command, ...otherParams] = string.trim().split(" ");
  const opened = [];
  const args = otherParams
    .join("\n")
    .split("")
    .map((char) => {
      if (char === "'" || char === '"') {
        if (char === opened[opened.length - 1]) {
          opened.pop();
        } else {
          opened.push(char);
        }

        return "";
      }
      if (char === "\n" && opened.length) {
        return " ";
      }

      return char;
    })
    .join("")
    .split("\n")
    .filter((arg) => !!arg);

  return [command, ...args];
};
