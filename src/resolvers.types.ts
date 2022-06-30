import dataSources from "./datasources";

export type ContextType = {
  dataSources: typeof dataSources;
};
export type ResolverType = Record<
  string,
  Record<string, (parent: any, args: any, context: ContextType) => any>
>;
