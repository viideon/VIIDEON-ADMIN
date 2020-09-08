import { put, takeEvery, select } from "redux-saga/effects";
import * as types from "../../actionTypes";
import { getPublicAssets, getSignedUrl } from "./Api";
import { toast } from "react-toastify";
import {
  publicAssetsLoadedAction,
  publicAssetsLoadingFailed,
  addingNewPublicAssetFailed
} from "../../Actions/PublicAssets";
import { getToken } from "../../Selectors";
const getAssets = function* () {
  try {
    const token = yield select(getToken);
    const publicAssetResp = yield getPublicAssets(token);
    yield put(publicAssetsLoadedAction(publicAssetResp.data.assets));
  } catch (err) {
    if (err.response) {
      yield put(publicAssetsLoadingFailed(err.response.data.message));
      toast.error(err.response.data.message);
    } else {
      yield put(publicAssetsLoadingFailed(err.message));
      toast.error(err.message);
    }
  }
};

const addNewAsset = function* () {
  try {
    const token = yield select(store => store.Authentication.user.token);
    const signedUrlResp = yield getSignedUrl(token);
    console.log(signedUrlResp);
    // yield put(publicAssetsLoadedAction(publicAssetResp.data.assets));
  } catch (err) {
    if (err.response) {
      yield put(addingNewPublicAssetFailed(err.response.data.message));
      toast.error(err.response.data.message);
    } else {
      yield put(addingNewPublicAssetFailed(err.message));
      toast.error(err.message);
    }
  }
};

export function* publicAssetWatcher() {
  yield takeEvery(types.LOAD_PUBLIC_ASSETS, getAssets);
  yield takeEvery(types.ADD_NEW_PUBLIC_ASSET, addNewAsset);
}
