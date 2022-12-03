import * as types from "../actionTypes";

const Authentication = (
  state = { isLoading: false, isAuthenticated: false, user: null },
  action
) => {
  switch (action.type) {
    case types.LOGIN:
      return { isLoading: true, isAuthenticated: false, user: null };
    case types.LOGEDIN:
      return { isLoading: false, isAuthenticated: true, user: action.payload };
    case types.LOGIN_FAILED:
      return { isLoading: false, isAuthenticated: false, user: null };
    case types.LOGOUT:
      return { isLoading: false, isAuthenticated: false, user: null };
    default:
      return state;
  }
};
export default Authentication;
