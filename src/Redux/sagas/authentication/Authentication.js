import { put, takeEvery } from "redux-saga/effects";
import * as types from "../../actionTypes";
import { toast } from "react-toastify";
import _ from "lodash";
import { loginFailed, loggedInAction } from "../../Actions/Authentication";
const login = function* (action) {
  try {
    const user = action.payload.user
    if (_.has(user.attributes, 'custom:userType') && user.attributes['custom:userType'] !== "ADMIN_USER") {
      toast.error("You are not Authorized");
      yield put(loginFailed());
    } else {
      yield put(loggedInAction(user));
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
