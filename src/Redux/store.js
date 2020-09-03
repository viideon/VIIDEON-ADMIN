import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddlware from "redux-saga";
import Authentication from "./Reducers/Authentication";
import rootSaga from "./sagas";
const sagaMiddleware = createSagaMiddlware();
const store = createStore(
  combineReducers({ Authentication }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
export default store;
