import React from "react";
import store from "../Redux/store";
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
      <Router history={hist}>
        <Switch>
          <ProtectedRoute path="/admin" component={Admin} />
          <AuthRoute path="/" component={SignIn} />
        </Switch>
      </Router>
    </Provider>
  );
};
export default MainComponent;
