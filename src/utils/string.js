export const shortenString = (string, length) => {
  if (length && string.length > length) {
    return `${item.slice(0, 61)}...`;
  }

  return string;
};
