const REQUIRED = (key: string) => `'${key}' must be required`;
const NUMBER = (key: string) => `'${key}' must be a number`;
const BOOLEAN = (key: string) => `'${key}' must be boolean`;
const STRING = (key: string) => `'${key}' must be a string`;
const ARRAY = (key: string, type: string) =>
  `'${key}' must be a string must be an array of ${type}`;
const DTO_ERROR = "DTO is not object";

const MESSAGES = {
  DTO_ERROR,
  REQUIRED,
  NUMBER,
  BOOLEAN,
  STRING,
  ARRAY,
};

export default MESSAGES;
