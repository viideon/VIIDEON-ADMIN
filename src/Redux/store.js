import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddlware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Authentication from "./Reducers/Authentication";
import Users from "./Reducers/Users";
import rootSaga from "./sagas";
import PublicAssets from "./Reducers/PublicAssets";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["Authentication"],
};

const persistedReducer = persistReducer(
  rootPersistConfig,
  combineReducers({ Authentication, Users, PublicAssets })
);
const sagaMiddleware = createSagaMiddlware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export const persitor = persistStore(store);
export default store;
