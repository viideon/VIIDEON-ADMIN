import * as types from "../actionTypes";

export const loadPublicAssetAction = () => ({
  type: types.LOAD_PUBLIC_ASSETS,
});
export const publicAssetsLoadedAction = (publicActions) => ({
  type: types.PUBLIC_ASSETS_LOADED,
  payload: publicActions,
});
export const publicAssetsLoadingFailed = (errMessage) => ({
  type: types.LOADING_PUBLIC_ASSETS_FAILED,
  payload: errMessage,
});
export const addNewPublicAsset = () => ({
  type: types.ADD_NEW_PUBLIC_ASSET,
});
export const newPublicAssetAdded = (asset) => ({
  type: types.NEW_PUBLIC_ASSET_ADDED,
  payload: asset,
});
export const addingNewPublicAssetFailed = () => ({
  type: types.ADDING_NEW_PUBLIC_ASSET_FAILED,
});