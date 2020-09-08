export const getToken = store => {
  return store.Authentication.user.token
    ? store.Authentication.user.token
    : null;
};
