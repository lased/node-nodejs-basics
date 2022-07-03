export const asyncQueries = async <T = any>(
  list: string[],
  callback: (item: string) => Promise<T>,
) => {
  const promises = [];

  list.forEach((item) => {
    promises.push(callback(item));
  });

  const result = await Promise.allSettled(promises.map((fn) => fn()));

  return result
    .filter((item) => item.status === 'fulfilled')
    .map((item: PromiseFulfilledResult<T>) => item.value);
};
