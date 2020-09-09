import { all, fork } from "redux-saga/effects";
import { authenticationWatcher } from "./authentication/Authentication";
import { usersWatcher } from "./users/User";
import { templateWatcher } from "./template/index";
import { publicAssetWatcher } from "./publicAssets/PublicAssets";
export default function* rootSaga() {
  yield all([
    fork(templateWatcher),
    fork(authenticationWatcher),
    fork(usersWatcher),
    fork(publicAssetWatcher)
  ]);
}
