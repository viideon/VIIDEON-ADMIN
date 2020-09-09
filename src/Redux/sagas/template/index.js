import { put, takeEvery } from "redux-saga/effects";
import types from "../../Types/campaigns";
import { addTemplateApi } from "./Api";
import { toast } from "react-toastify";

const addCampaignTemplate = function* (action) {
  try {
    const result = yield addTemplateApi(action.payload);
    if (result.status === 201) {
      yield put({
        type: types.ADD_CAMPAIGN_TEMPLATE_SUCCESS,
        payload: result.data.template
      });
      toast.info("Template Added");
    } else {
      yield put({ type: types.ADD_CAMPAIGN_TEMPLATE_FAILURE });
      toast.error("Error adding template");
    }
  } catch (error) {
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

export function* templateWatcher() {
  yield takeEvery(types.ADD_CAMPAIGN_TEMPLATE, addCampaignTemplate);
}
