import { put, takeEvery, takeLatest, select } from "redux-saga/effects";
import types from "../../Types/industries";
import { addIndustryApi, getIndustriesApi, updateIndustryApi, deleteIndustryApi } from "./Api";
import { toast } from "react-toastify";
import { getIndustries } from "../../Selectors";

const addIndustry = function* (action) {
  try {
    const result = yield addIndustryApi(action.payload);
    if (result.status === 201) {
      yield put({type: types.ADD_CAMPAIGN_INDUSTRY_SUCCESS});
      yield put({type: types.GET_INDUSTRIES});
      yield put({ type: types.TURN_TO_NULL });
      toast.info("Industry Added");
    } else {
      yield put({ type: types.ADD_CAMPAIGN_INDUSTRY_FAILURE });
      toast.error("Error adding industry");
    }
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

function* getIndustriesSaga(action) {
  try {
    const result = yield getIndustriesApi();
    if (result.status === 200) {
      yield put({
        type: types.GET_INDUSTRIES_SUCCESS,
        payload: result.data.industries
      });
    } else {
      yield put({ type: types.GET_INDUSTRIES_FAILURE });
    }
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
    const result = yield updateIndustryApi(action.payload);
    if (result.status === 200) {
      yield put({ type: types.UPDATE_INDUSTRY_SUCCESS });
      yield put({ type: types.GET_INDUSTRIES})
      yield put({ type: types.TURN_TO_NULL });
      toast.info("Industry updated");
    } else {
      yield put({ type: types.UPDATE_INDUSTRY_FAILURE });
      toast.error("Unexpected error,failed to update industry");
    }
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
    const result = yield deleteIndustryApi(action.payload);
    if (result.status === 200) {
      yield put({ type: types.DELETE_INDUSTRY_SUCCESS });
      yield put({ type: types.GET_INDUSTRIES})
      yield put({ type: types.TURN_TO_NULL });
      toast.info("Industry deleted");
    } else {
      yield put({ type: types.DELETE_INDUSTRY_FAILURE });
      toast.error("Unexpected error, failed to delete industry");
    }
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
