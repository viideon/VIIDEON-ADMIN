import { put, takeEvery, takeLatest, select } from "redux-saga/effects";
import types from "../../Types/campaigns";
import { addTemplateApi, getTemplatesApi, updateTemplateApi, deleteTemplateApi } from "./Api";
import { toast } from "react-toastify";
import { getTemplates } from "../../Selectors";
import {asyncForEach} from '../../../util';
import {Storage} from 'aws-amplify';

const addCampaignTemplate = function* (action) {
  try {
    const result = yield addTemplateApi(action.payload);
    result.template.templateThumbnailUrl = yield Storage.get(result.template.templateThumbnailUrl, {level: 'public'});
    yield put({
      type: types.ADD_CAMPAIGN_TEMPLATE_SUCCESS,
      payload: result.template
    });
    yield put({ type: types.TURN_TO_NULL });
    toast.info("Template Added");
  } catch (error) {
    console.error('addCampaignTemplate error', error);
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

function* getCampaignTemplates() {
  try {
    const result = yield getTemplatesApi();
    const _result = [];
    yield asyncForEach(result.templates, async template => {
      const url = await Storage.get(template.templateThumbnailUrl, {level: 'public'});
      _result.push({
        ...template,
        templateThumbnailUrl: url,
      });
    });
    yield put({
      type: types.GET_TEMPLATES_SUCCESS,
      payload: _result
    });
  } catch (error) {
    console.error('getCampaignTemplates error', error);
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
    const templates = yield select(getTemplates);
    const filterTemplates = templates.filter(template => template._id !== id);
    const newTemplates = [...filterTemplates, result.template];
    yield put({ type: types.UPDATE_TEMPLATE_SUCCESS, payload: newTemplates });
    yield put({ type: types.TURN_TO_NULL });
    toast.info("Template updated");
  } catch (error) {
    console.error('updateTemplate error', error);
    if (error.response) {
      const errorMessage = error.response.message;
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
    const templates = yield select(getTemplates);
    const filterTemplates = templates.filter(template => template._id !== action.payload);
    const newTemplates = [...filterTemplates, result.template];
    yield put({ type: types.DELETE_TEMPLATE_SUCCESS, payload: newTemplates });
    yield put({ type: types.GET_TEMPLATES });
    yield put({ type: types.TURN_TO_NULL });
    toast.info("Template deleted");
  } catch (error) {
    console.error('deleteTemplate error', error);
    if (error.response) {
      const errorMessage = error.response.message;
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
