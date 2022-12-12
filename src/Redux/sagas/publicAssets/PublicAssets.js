import { put, takeEvery, select } from "redux-saga/effects";
import { Storage } from "aws-amplify";
import * as types from "../../actionTypes";

import { getPublicAssets,addMusicAsset,getPublicMusicApi } from "./Api";
import { toast } from "react-toastify";
import {
  publicAssetsLoadedAction,
  publicAssetsLoadingFailed
} from "../../Actions/PublicAssets";
import { getToken } from "../../Selectors";
import {asyncForEach} from "../../../util/index";

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

const addNewAsset = function* (action) {
  try {
    yield addMusicAsset(action.payload);
    yield put({ type: "ADD_NEW_ASSET" });
    yield put({
      type: types.GET_PUBLIC_MUSIC
    });
  } catch (err) {
    console.error('Error adding asset', err);
    toast.error(" server error Failed to add your asset try again");
  }
};

function* getPublicMusicAsset() {
  try {
    const result = yield getPublicMusicApi();
    const _result = [];
    yield asyncForEach(result.musicAssetIs, async asset => {
      const url = await Storage.get(asset.url, {level: 'public'});
      _result.push({
        ...asset,
        url,
      });
    });
    yield put({
      type: types.GET_PUBLIC_MUSIC_SUCCESS,
      payload: _result,
    });
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
      yield put({ type: types.GET_PUBLIC_MUSIC_FAILURE });
    } else if (error.request) {
      const errorMessage = "Error. Please check your internet connection.";
      toast.error(errorMessage);
      yield put({ type: types.GET_PUBLIC_MUSIC_FAILURE });
    } else {
      const errorMessage = "Failed to fetch user assets, There was some error.";
      toast.error(errorMessage);
      yield put({ type: types.GET_PUBLIC_MUSIC_FAILURE })   
    }
  }
}

export function* publicAssetWatcher() {
  yield takeEvery(types.LOAD_PUBLIC_ASSETS, getAssets);
  yield takeEvery(types.ADD_NEW_PUBLIC_ASSET, addNewAsset);
  yield takeEvery(types.GET_PUBLIC_MUSIC, getPublicMusicAsset);
}
