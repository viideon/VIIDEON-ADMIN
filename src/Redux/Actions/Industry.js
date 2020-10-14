import types from "../Types/industries";

export const addCampaignIndustry = industry => ({
  type: types.ADD_CAMPAIGN_INDUSTRY,
  payload: industry
});

export const getIndustries = () => ({
  type: types.GET_INDUSTRIES
});
export const updateIndustry = (id, industry) => ({
  type: types.UPDATE_INDUSTRY,
  payload: {id, industry}
});
export const deleteIndustry = (id) => {
  return {
    type: types.DELETE_INDUSTRY_REQUEST,
    payload: id
  }
}