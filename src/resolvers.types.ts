import dataSources from "./datasources";
import resolvers from "./resolvers";

export type ContexType = {
  dataSources: typeof dataSources;
};
export type ResolverType = Record<
  string,
  Record<string, (parent: any, args: any, context: ContexType) => any>
>;
