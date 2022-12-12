import * as types from "../actionTypes";

export const loginAction = (user) => ({
  type: types.LOGIN,
  payload: { user },
});
export const loggedInAction = (user) => ({
  type: types.LOGEDIN,
  payload: user,
});

export const loginFailed = () => ({ type: types.LOGIN_FAILED });

export const logoutAction = () => ({ type: types.LOGOUT });
