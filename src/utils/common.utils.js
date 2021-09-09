export const browserQueries = (location) => {
  return new URLSearchParams(location?.search);
};

export const noteActionsType = {
  RENAME: 'rename',
  DELETE: 'delete',
  SHARE: 'sharing'
};
