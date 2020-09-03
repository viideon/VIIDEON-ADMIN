import * as types from "../actionTypes";

export const loginAction = ({ email, password }) => ({
  type: types.LOGIN,
  payload: { email, password },
});
export const loggedInAction = (user) => ({
  type: types.LOGEDIN,
  payload: user,
});

export const loginFailed = () => ({ type: types.LOGIN_FAILED });
