import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes } from '../router';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.viewer ? <Component {...props} /> : <Redirect to={routes.login} />
      }
    />
  );
}

function mapStateToProps(state) {
  return {
    viewer: state.viewer.user,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
