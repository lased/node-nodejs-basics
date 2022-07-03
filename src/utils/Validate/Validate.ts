import { RulesType, ValidationType } from "./Validate.types";
import MESSAGES from "./Validate.constants";

export const Validate = (dto: Record<string, any>, rules: RulesType) => {
  const validate: ValidationType = { isValid: true };

  if (typeof dto !== "object") {
    validate.isValid = false;
    validate.error = MESSAGES.DTO_ERROR;

    return validate;
  }

  for (const key in rules) {
    const rulesByKey = rules[key];
    const value = dto[key];
    let error;

    if (!rulesByKey.required && value === undefined) {
      continue;
    }
    if (rulesByKey.required && value === undefined) {
      error = MESSAGES.REQUIRED(key);
    } else if (rulesByKey.number && typeof value !== "number") {
      error = MESSAGES.NUMBER(key);
    } else if (rulesByKey.boolean && typeof value !== "boolean") {
      error = MESSAGES.BOOLEAN(key);
    } else if (rulesByKey.string && typeof value !== "string") {
      error = MESSAGES.STRING(key);
    } else if (rulesByKey.array) {
      const isArray = Array.isArray(value);
      const isValidArray = isArray
        ? (value as any[]).every((item) => typeof item === rulesByKey.array)
        : false;

      if (!isValidArray) {
        error = MESSAGES.ARRAY(key, rulesByKey.array);
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
