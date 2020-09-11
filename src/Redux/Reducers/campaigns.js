import types from "../Types/campaigns";

const Campaigns = (
  state = {
    isTemplateSaved: false,
    templates: [],
    redirectAfterSave: null,
    closeModalAfterUpdate: null
  },
  action
) => {
  switch (action.type) {
    case types.ADD_CAMPAIGN_TEMPLATE:
      return { ...state, isTemplateSaved: true };
    case types.ADD_CAMPAIGN_TEMPLATE_SUCCESS:
      let template = action.payload;
      return {
        ...state,
        isTemplateSaved: false,
        redirectAfterSave: true,
        templates: [template, ...state.templates]
      };
    case types.ADD_CAMPAIGN_TEMPLATE_FAILURE:
      return { ...state, isTemplateSaved: false };
    case types.GET_TEMPLATES:
      return { ...state, loaingTemplates: true };
    case types.GET_TEMPLATES_SUCCESS:
      const templates = action.payload;
      return { ...state, loadingTemplates: false, templates: templates };
    case types.GET_TEMPLATES_FAILURE:
      return { ...state, loadingTemplates: false };
    case types.TURN_TO_NULL:
      return { ...state, redirectAfterSave: null, closeModalAfterUpdate: null };
    case types.UPDATE_TEMPLATE:
      return { ...state, isTemplateUpdating: true };
    case types.UPDATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        isTemplateUpdating: false,
        closeModalAfterUpdate: true,
        templates: action.payload
      };
    case types.UPDATE_TEMPLATE_FAILURE:
      return { ...state, isTemplateUpdating: false };
    default:
      return state;
  }
};
export default Campaigns;
