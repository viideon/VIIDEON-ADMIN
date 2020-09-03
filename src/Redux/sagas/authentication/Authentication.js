import { put, takeEvery } from "redux-saga/effects";
import * as types from "../../actionTypes";
import { loginApi } from "./Api";
import { toast } from "react-toastify";
import { loginFailed, loggedInAction } from "../../Actions/Authentication";
const login = function* (action) {
  try {
    const loginResp = yield loginApi(action.payload);
    if (loginResp.data.user.userType !== "ADMIN_USER") {
      toast.error("You are not Authorized");
      yield put(loginFailed());
    } else {
      yield put(loggedInAction(loginResp.data));
    }
  } catch (err) {
    yield put(loginFailed());
    if (err.response) {
      toast.error(err.response.data.message);
    } else {
      toast.error(err.message);
    }
  }
};

export function* authenticationWatcher() {
  yield takeEvery(types.LOGIN, login);
}
