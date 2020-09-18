import * as types from "../actionTypes";

export const loadUserAction = (pageNo, pageSize) => ({
  type: types.LOAD_USERS,
  payload: {pageNo, pageSize}
});
export const usersLoadedAction = (users, nPages) => ({
  type: types.USERS_LOADED,
  payload: {users, nPages},
});
export const usersLoadingFailed = (errMessage) => ({
  type: types.USERS_LOADED_FAILED,
  payload: errMessage,
});
