import { all, fork } from "redux-saga/effects";
import { authenticationWatcher } from "./authentication/Authentication";

export default function* rootSaga() {
  yield all([fork(authenticationWatcher)]);
}
