export type PaginationType = {
  limit: number;
  offset: number;
};
export type ParamsType<T> = {
  pagination: PaginationType;
  filter: Partial<T>;
};
