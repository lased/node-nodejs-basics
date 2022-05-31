export const parseEnv = () => {
  const envs = Object.keys(process.env)
    .filter((name) => name.startsWith("RSS_"))
    .map((name) => `${name}=${process.env[name]}`);

  console.log(envs.join("; "));
};
