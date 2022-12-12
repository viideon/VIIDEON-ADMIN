import { put, takeEvery, select } from "redux-saga/effects";
import * as types from "../../actionTypes";
import { getUsersApi, removeUserApi } from "./Api";
import { toast } from "react-toastify";
import { usersLoadedAction, usersLoadingFailed } from "../../Actions/Users";
import { getToken } from "../../Selectors";
const getUsers = function* (action) {
  try {
    const token = yield select(getToken);
    const { pageNo, pageSize } = action.payload
    const usersResp = yield getUsersApi(pageNo, pageSize, token);
    const { users, count } = usersResp;
    yield put(usersLoadedAction(users, count));
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
const userRemoveSaga = function* (action) {
  try {
    const token = yield select(getToken);

    yield removeUserApi(action.payload, token);
    
    yield put( {type: "USER_REMOVE_S", payload: action.payload } );
  } catch (err) {
   console.error(err)
  }
};



export function* usersWatcher() {
  yield takeEvery(types.LOAD_USERS, getUsers);
  yield takeEvery(types.USER_REMOVE, userRemoveSaga);
}


