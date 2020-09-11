export const getToken = store => {
  return store.Authentication.user.token
    ? store.Authentication.user.token
    : null;
};
export const getTemplates = store => {
  return store.Campaigns.templates ? store.Campaigns.templates : null;
};
