const REQUIRED = (key: string) => `'${key}' must be required`;
const NUMBER = (key: string) => `'${key}' must be a number`;
const BOOLEAN = (key: string) => `'${key}' must be boolean`;
const STRING = (key: string) => `'${key}' must be a string`;
const ARRAY = (key: string, type: string) =>
  `'${key}' must be a string must be an array of ${type}`;

const MESSAGES = {
  REQUIRED,
  NUMBER,
  BOOLEAN,
  STRING,
  ARRAY,
};

export default MESSAGES;
