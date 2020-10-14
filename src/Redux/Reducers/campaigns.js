import types from "../Types/campaigns";
import industryTypes from '../Types/industries'

const initialState = {
  isTemplateSaved: false,
  loading: false,
  industries: [],
  templates: [],
  redirectAfterSave: null,
  closeModalAfterUpdate: null
};
const Campaigns = (state = initialState, action) => {
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
    
    case industryTypes.ADD_CAMPAIGN_INDUSTRY:
      return { ...state, redirectAfterSave: false, loading: true}
    case industryTypes.ADD_CAMPAIGN_INDUSTRY_SUCCESS:
    case industryTypes.ADD_CAMPAIGN_INDUSTRY_FAILURE:
      return { ...state, redirectAfterSave: true, loading: false}
    case industryTypes.GET_INDUSTRIES:
    case industryTypes.UPDATE_INDUSTRY:
    case industryTypes.DELETE_INDUSTRY_REQUEST:
      return {...state,loading: true}
    case industryTypes.UPDATE_INDUSTRY_SUCCESS:
      return {...state, loading: false, closeModalAfterUpdate: true}
    case industryTypes.UPDATE_INDUSTRY_FAILURE:
    case industryTypes.DELETE_INDUSTRY_FAILURE:
    case industryTypes.DELETE_INDUSTRY_SUCCESS:
      return {...state, loading: false}
    case industryTypes.GET_INDUSTRIES_FAILURE:
      return {...state, loading: false}
    case industryTypes.GET_INDUSTRIES_SUCCESS:
      return {...state,industries: action.payload,loading: false}
    default:
      return state;
  }
};
export default Campaigns;
