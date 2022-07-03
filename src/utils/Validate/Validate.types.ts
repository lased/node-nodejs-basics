export type PrimitiveType = "string" | "number" | "boolean";
export type RuleType = Partial<
  Record<PrimitiveType | "required", boolean> & {
    array: PrimitiveType;
  }
>;
export type RulesType = Record<string, RuleType>;
export type ValidationType = {
  isValid: boolean;
  error?: string;
};
