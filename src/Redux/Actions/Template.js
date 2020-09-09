import types from "../Types/campaigns";

export const addCampaignTemplate = template => ({
  type: types.ADD_CAMPAIGN_TEMPLATE,
  payload: template
});
