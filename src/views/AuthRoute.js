import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoutes = (props) => {
  if (!props.Auth.isAuthenticated) {
    return <Route {...props} />;
  }
  return <Redirect to="/admin" />;
};
const mapStateToProps = (store) => ({
  Auth: store.Authentication,
});
export default connect(mapStateToProps)(AuthRoutes);
