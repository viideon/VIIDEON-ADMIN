import * as types from "../actionTypes";

const PublicAssets = (
  state = { isLoading: false, errMessage: null, assets: null },
  action
) => {
  switch (action.type) {
    case types.LOAD_PUBLIC_ASSETS:
      return { isLoading: true, errMessage: null, assets: null };
    case types.PUBLIC_ASSETS_LOADED:
      return { isLoading: false, errMessage: null, assets: action.payload };
    case types.LOADING_PUBLIC_ASSETS_FAILED:
      return { isLoading: false, errMessage: action.payload, assets: null };
    case types.ADD_NEW_PUBLIC_ASSET:
      return { ...state, isLoading: true, errMessage: null };
    case types.NEW_PUBLIC_ASSET_ADDED:
      return {
        isLoading: false,
        errMessage: null,
        assets: [action.payload, ...state.assets],
      };
    case types.ADDING_NEW_PUBLIC_ASSET_FAILED:
      return { ...state, isLoading: false, errMessage: null };
    default:
      return state;
  }
};
export default PublicAssets;