export const parseArgs = () => {
  const [command, file, ...argv] = process.argv;
  let result = [];

  for (let index = 0; index < argv.length / 2; index++) {
    const prop = argv[index * 2];
    const value = argv[index * 2 + 1];

    result.push(`${prop.slice(2)} is ${value}`);
  }

  console.log(result.join(", "));
};
