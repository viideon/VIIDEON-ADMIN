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
import {Amplify} from 'aws-amplify';

const hist = createBrowserHistory();
toast.configure({
  autoClose: 4000,
  pauseOnHover: false,
  hideProgressBar: true,
  pauseOnFocusLoss: false,
  limit: 2,
});

// Amplify.Logger.LOG_LEVEL = 'DEBUG';

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
    authenticationFlowType: 'USER_SRP_AUTH'
  },
  API: {
    endpoints: [
      {
        name: 'Backend',
        endpoint: process.env.REACT_APP_APIURL,
      },
    ],
  },
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
