export type PositionType = {
  x: number;
  y: number;
};
export type CommandResultType = Promise<{
  position?: PositionType;
  data?: string;
} | void>;
