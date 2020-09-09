import types from "../Types/campaigns";

const campaigns = (state = { isTemplateSaved: false }, action) => {
  switch (action.type) {
    case types.ADD_CAMPAIGN_TEMPLATE:
      return { isTemplateSaved: true };
    case types.ADD_CAMPAIGN_TEMPLATE_SUCCESS:
      return { isTemplateSaved: false };
    case types.ADD_CAMPAIGN_TEMPLATE_SUCCESS:
      return { isTemplateSaved: false };
    default:
      return state;
  }
};
export default campaigns;
