import { put, takeEvery, select } from "redux-saga/effects";
import * as types from "../../actionTypes";

import { getPublicAssets, getSignedUrl,addMusicAsset,getPublicMusicApi } from "./Api";
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

const addNewAsset = function* (action) {
  try {
    // console.log("in addnewasset",action.payload)
    const result = yield addMusicAsset(action.payload);
    if (result.status === 201) {
      yield put({ type: "ADD_NEW_ASSET" });
      yield put({
        type: types.GET_PUBLIC_MUSIC
      });
    } else {
      toast.error("Failed to add your asset try again");
    }
    // const token = yield select(store => store.Authentication.user.token);
    // const signedUrlResp = yield getSignedUrl(token);
    // console.log(signedUrlResp);
    // yield put(publicAssetsLoadedAction(publicAssetResp.data.assets));
  } catch (err) {
    toast.error(" server error Failed to add your asset try again");
    // if (err.response) {
    //   yield put(addingNewPublicAssetFailed(err.response.data.message));
    //   toast.error(err.response.data.message);
    // } else {
    //   yield put(addingNewPublicAssetFailed(err.message));
    //   toast.error(err.message);
    // }
  }
};

function* getPublicMusicAsset() {
  try {
    const result = yield getPublicMusicApi();
    console.log("getpublicmusic is ",result)
    if (result.status === 200) {
      yield put({
        type: types.GET_PUBLIC_MUSIC_SUCCESS,
        payload: result.data.musicAssetIs
      });
    } else {
      yield put({ type: types.GET_PUBLIC_MUSIC_FAILURE });
    }
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
