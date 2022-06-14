import { RulesType, ValidationType } from "./Validate.types";

export const Validate = (dto: Record<string, any>, rules: RulesType) => {
  const validate: ValidationType = { isValid: true };

  for (const key in rules) {
    const rulesByKey = rules[key];
    const value = dto[key];
    let error;

    if (!rulesByKey.required && !value) {
      break;
    } else if (rulesByKey.required && value === undefined) {
      error = `'${key}' must be required`;
    } else if (rulesByKey.number && typeof value !== "number") {
      error = `'${key}' must be a number`;
    } else if (rulesByKey.boolean && typeof value !== "boolean") {
      error = `'${key}' must be boolean`;
    } else if (rulesByKey.string && typeof value !== "string") {
      error = `'${key}' must be a string`;
    } else if (rulesByKey.array) {
      const isArray = Array.isArray(value);
      const isValidArray = isArray
        ? value.every((item) => typeof item === rulesByKey.array)
        : false;

      if (!isValidArray) {
        error = `'${key}' must be an array of ${rulesByKey.array}`;
      }
    }

    if (error) {
      validate.isValid = false;
      validate.error = error;
      break;
    }
  }

  return validate;
};
