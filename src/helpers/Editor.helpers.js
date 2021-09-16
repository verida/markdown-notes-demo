export const reduceStringLength = (text, length, startIndex = 0) => {
  const words = text.split(' ');
  if (words.length > length) {
    return text.substring(startIndex, length);
  }
  return text;
};
