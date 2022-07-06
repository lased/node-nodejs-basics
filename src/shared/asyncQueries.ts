export const asyncQueries = async <T = any>(
  list: string[],
  callback: (item: string) => Promise<T>,
) => {
  const promises = [];

  list
    .filter((value) => value)
    .forEach((item) => {
      promises.push(() => callback(item));
    });

  const result = await Promise.allSettled(promises.map((fn) => fn()));

  return result
    .map((item: PromiseSettledResult<T>) => {
      if (item.status === 'fulfilled') {
        return item.value;
      }

      return item.reason;
    })
    .filter((value) => value);
};
