import React from "react";
import store, { persitor } from "../Redux/store";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import "react-toastify/dist/ReactToastify.css";
import "assets/css/material-dashboard-react.css?v=1.9.0";

import Admin from "../layouts/Admin.js";
import SignIn from "views/SignIn/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import { PersistGate } from "redux-persist/integration/react";

const hist = createBrowserHistory();
toast.configure({
  autoClose: 4000,
  pauseOnHover: false,
  hideProgressBar: true,
  pauseOnFocusLoss: false,
  limit: 2,
});
const MainComponent = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persitor}>
        <Router history={hist}>
          <Switch>
            <ProtectedRoute path="/admin" component={Admin} />
            <AuthRoute path="/" component={SignIn} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};
export default MainComponent;
