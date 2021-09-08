export const reduceStringLength = (text, length, startIndex = 0) => {
  if (text.length > length) {
    return text.substring(startIndex, length);
  }
  return '';
};
