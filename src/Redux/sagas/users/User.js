import { put, takeEvery, select } from "redux-saga/effects";
import * as types from "../../actionTypes";
import { getUsersApi } from "./Api";
import { toast } from "react-toastify";
import { usersLoadedAction, usersLoadingFailed } from "../../Actions/Users";
const getUsers = function* (action) {
  try {
    const token = yield select((store) => store.Authentication.user.token);
    const usersResp = yield getUsersApi(action.payload, token);
    yield put(usersLoadedAction(usersResp.data.users));
  } catch (err) {
    if (err.response) {
      yield put(usersLoadingFailed(err.response.data.message));
      toast.error(err.response.data.message);
    } else {
      yield put(usersLoadingFailed(err.message));
      toast.error(err.message);
    }
  }
};

export function* usersWatcher() {
  yield takeEvery(types.LOAD_USERS, getUsers);
}
