export const parserArgv = () => {
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
