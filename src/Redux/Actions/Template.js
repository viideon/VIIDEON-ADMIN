import types from "../Types/campaigns";

export const addCampaignTemplate = template => ({
  type: types.ADD_CAMPAIGN_TEMPLATE,
  payload: template
});

export const getCampaignTemplates = () => ({
  type: types.GET_TEMPLATES
});