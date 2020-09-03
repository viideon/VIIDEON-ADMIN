import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Authentication } = props;
  if (Authentication.isAuthenticated) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};
const mapStateToProps = (store) => ({
  Authentication: store.Authentication,
});
export default connect(mapStateToProps)(ProtectedRoute);
