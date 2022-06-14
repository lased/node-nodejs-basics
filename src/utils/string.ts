export const trimSlash = (str: string) => str.replace(/^\/*|\/*$/g, "");
export const queryParams = (query: string) =>
  query
    ? query.split("&").reduce((acc, param) => {
        const [key, value] = param.split("=");

        return { ...acc, [key]: value };
      }, {})
    : {};
