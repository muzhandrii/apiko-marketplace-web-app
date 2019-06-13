import React from 'react';
import T from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Footer } from '../../components';
import { SellLink } from '../components';
import { routes } from '../router';
import Login from '../Login/LoginContainer';
import Register from '../Register/RegisterContainer';
import PasswordRestore from '../PasswordRestore/PasswordRestoreContainer';

function Auth({ viewer }) {
  return (
    <>
      <Header light>
        <SellLink />
      </Header>
      <div className="main">
        <Switch>
          {viewer && <Redirect to={routes.home} />}
          <Route path={routes.login} component={Login} exact />
          <Route path={routes.register} component={Register} exact />
          <Route path={routes.recover} component={PasswordRestore} exact />
          <Redirect from={routes.auth} to={routes.login} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

Auth.propTypes = {
  viewer: T.object,
};

Auth.defaultProps = {
  viewer: null,
};

function mapStateToProps(state) {
  return {
    viewer: state.viewer.user,
  };
}

export default connect(mapStateToProps)(Auth);
