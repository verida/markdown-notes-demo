export const browserQueries = (location) => {
  return new URLSearchParams(location?.search);
};
