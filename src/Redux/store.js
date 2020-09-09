import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddlware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Authentication from "./Reducers/Authentication";
import Campaigns from "./Reducers/Campaigns";
import Users from "./Reducers/Users";
import rootSaga from "./sagas";
import PublicAssets from "./Reducers/PublicAssets";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["Authentication", "Campaigns"]
};

const persistedReducer = persistReducer(
  rootPersistConfig,
  combineReducers({ Authentication, Users, PublicAssets, Campaigns })
);
const sagaMiddleware = createSagaMiddlware();
let enhancer;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(sagaMiddleware)
  );
} else {
  enhancer = compose(applyMiddleware(sagaMiddleware));
}
const store = createStore(persistedReducer, {}, enhancer);
sagaMiddleware.run(rootSaga);

export const persitor = persistStore(store);
export default store;
