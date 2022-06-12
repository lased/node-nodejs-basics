const args = process.argv.slice(2);

console.log(
  `\x1b[1;33m(Child)\x1b[0m Total number of arguments is ${args.length}`
);
console.log(`\x1b[1;33m(Child)\x1b[0m Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.includes("CLOSE")) process.exit(0);
  process.stdout.write(
    `\x1b[1;33m(Child)\x1b[0m Received from master process: ${chunk.toString()}`
  );
};

process.stdin.on("data", echoInput);
