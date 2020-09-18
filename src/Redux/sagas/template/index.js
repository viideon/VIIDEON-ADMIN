import { put, takeEvery, takeLatest, select } from "redux-saga/effects";
import types from "../../Types/campaigns";
import { addTemplateApi, getTemplatesApi, updateTemplateApi, deleteTemplateApi } from "./Api";
import { toast } from "react-toastify";
import { getTemplates } from "../../Selectors";

const addCampaignTemplate = function* (action) {
  try {
    const result = yield addTemplateApi(action.payload);
    console.log("result", result);
    if (result.status === 201) {
      yield put({
        type: types.ADD_CAMPAIGN_TEMPLATE_SUCCESS,
        payload: result.data.template
      });
      yield put({ type: types.TURN_TO_NULL });
      toast.info("Template Added");
    } else {
      yield put({ type: types.ADD_CAMPAIGN_TEMPLATE_FAILURE });
      toast.error("Error adding template");
    }
  } catch (error) {
    console.log("result", error);
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.ADD_CAMPAIGN_TEMPLATE_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.ADD_CAMPAIGN_TEMPLATE_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.ADD_CAMPAIGN_TEMPLATE_FAILURE });
    }
  }
};

function* getCampaignTemplates(action) {
  try {
    const result = yield getTemplatesApi();
    if (result.status === 200) {
      yield put({
        type: types.GET_TEMPLATES_SUCCESS,
        payload: result.data.templates
      });
    } else {
      yield put({ type: types.GET_TEMPLATES_FAILURE });
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.GET_TEMPLATES_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.GET_TEMPLATES_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.GET_TEMPLATES_FAILURE });
    }
  }
}
function* updateTemplate(action) {
  try {
    let { id } = action.payload;
    const result = yield updateTemplateApi(action.payload);
    if (result.status === 200) {
      const templates = yield select(getTemplates);
      const filterTemplates = templates.filter(template => template._id !== id);
      const newTemplates = [...filterTemplates, result.data.template];
      yield put({ type: types.UPDATE_TEMPLATE_SUCCESS, payload: newTemplates });
      yield put({ type: types.TURN_TO_NULL });
      toast.info("Template updated");
    } else {
      yield put({ type: types.UPDATE_TEMPLATE_FAILURE });
      toast.error("Unexpected error,failed to update template");
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.UPDATE_TEMPLATE_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.UPDATE_TEMPLATE_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.UPDATE_TEMPLATE_FAILURE });
    }
  }
}
function* deleteTemplate(action) {
  try {
    const result = yield deleteTemplateApi(action.payload);
    if (result.status === 200) {
      const templates = yield select(getTemplates);
      const filterTemplates = templates.filter(template => template._id !== action.payload);
      const newTemplates = [...filterTemplates, result.data.template];
      yield put({ type: types.DELETE_TEMPLATE_SUCCESS, payload: newTemplates });
      yield put({ type: types.GET_TEMPLATES });
      yield put({ type: types.TURN_TO_NULL });
      toast.info("Template deleted");
    } else {
      yield put({ type: types.DELETE_TEMPLATE_FAILURE });
      toast.error("Unexpected error,failed to delete template");
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.DELETE_TEMPLATE_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.DELETE_TEMPLATE_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.DELETE_TEMPLATE_FAILURE });
    }
  }
}
export function* templateWatcher() {
  yield takeEvery(types.ADD_CAMPAIGN_TEMPLATE, addCampaignTemplate);
  yield takeLatest(types.GET_TEMPLATES, getCampaignTemplates);
  yield takeLatest(types.UPDATE_TEMPLATE, updateTemplate);
  yield takeLatest(types.DELETE_TEMPLATE_REQUEST, deleteTemplate);
}
