import * as types from "../actionTypes";

export const loadUserAction = (pageNo) => ({
  type: types.LOAD_USERS,
  payload: pageNo,
});
export const usersLoadedAction = (users) => ({
  type: types.USERS_LOADED,
  payload: users,
});
export const usersLoadingFailed = (errMessage) => ({
  type: types.USERS_LOADED_FAILED,
  payload: errMessage,
});
