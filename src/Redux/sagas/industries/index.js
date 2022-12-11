import { put, takeEvery, takeLatest } from "redux-saga/effects";
import types from "../../Types/industries";
import { addIndustryApi, getIndustriesApi, updateIndustryApi, deleteIndustryApi } from "./Api";
import { toast } from "react-toastify";
import { Storage } from "aws-amplify";
import {asyncForEach} from '../../../util';

const addIndustry = function* (action) {
  try {
    yield addIndustryApi(action.payload);
    yield put({type: types.ADD_CAMPAIGN_INDUSTRY_SUCCESS});
    yield put({type: types.GET_INDUSTRIES});
    yield put({ type: types.TURN_TO_NULL });
    toast.info("Industry Added");
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.ADD_CAMPAIGN_INDUSTRY_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.ADD_CAMPAIGN_INDUSTRY_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.ADD_CAMPAIGN_INDUSTRY_FAILURE });
    }
  }
};

function* getIndustriesSaga() {
  try {
    const result = yield getIndustriesApi();
    const _result = [];
    yield asyncForEach(result.industries, async industry => {
      const url = await Storage.get(industry.thumbnailUrl, {level: 'public'});
      _result.push({
        ...industry,
        thumbnailUrl: url,
      });
    });
    yield put({
      type: types.GET_INDUSTRIES_SUCCESS,
      payload: _result
    });
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.GET_INDUSTRIES_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.GET_INDUSTRIES_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.GET_INDUSTRIES_FAILURE });
    }
  }
}
function* updateIndustry(action) {
  try {
    yield updateIndustryApi(action.payload);
    yield put({ type: types.UPDATE_INDUSTRY_SUCCESS });
    yield put({ type: types.GET_INDUSTRIES})
    yield put({ type: types.TURN_TO_NULL });
    toast.info("Industry updated");
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.UPDATE_INDUSTRY_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.UPDATE_INDUSTRY_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.UPDATE_INDUSTRY_FAILURE });
    }
  }
}
function* deleteIndustry(action) {
  try {
    yield deleteIndustryApi(action.payload);
    yield put({ type: types.DELETE_INDUSTRY_SUCCESS });
    yield put({ type: types.GET_INDUSTRIES})
    yield put({ type: types.TURN_TO_NULL });
    toast.info("Industry deleted");
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.DELETE_INDUSTRY_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.DELETE_INDUSTRY_FAILURE });
    } else {
      const errorMessage = "Unexpected error";
      toast.error(errorMessage);
      yield put({ type: types.DELETE_INDUSTRY_FAILURE });
    }
  }
}
export function* industryWatcher() {
  yield takeEvery(types.ADD_CAMPAIGN_INDUSTRY, addIndustry);
  yield takeLatest(types.GET_INDUSTRIES, getIndustriesSaga);
  yield takeLatest(types.UPDATE_INDUSTRY, updateIndustry);
  yield takeLatest(types.DELETE_INDUSTRY_REQUEST, deleteIndustry);
}
