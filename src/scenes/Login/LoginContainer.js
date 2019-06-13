import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from './LoginView';
import { authOperations } from '../../modules/auth';
import { routes } from '../router';

function mapStateToProps(state) {
  return {
    isLoading: state.auth.login.isLoading,
    error: state.auth.login.error,
  };
}

const mapDispatchToProps = {
  login: authOperations.login,
};

const enhancer = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('isPasswordVisible', 'passwordToggle', false),
  withState('showError', 'errorHandler', false),
  withHandlers({
    errorToggle: ({ errorHandler }) => (value) => {
      errorHandler(value);
    },
    handlePasswordToggle: ({ passwordToggle, isPasswordVisible }) => () => {
      passwordToggle(!isPasswordVisible);
    },
    handleLogin: ({ login, history, location, errorHandler }) => async (
      body,
    ) => {
      try {
        await login(body);
        if (location.state === 'product') {
          history.goBack();
        } else {
          history.push(routes.home);
        }
      } catch (err) {
        errorHandler(true);
        throw err;
      }
    },
  }),
);

export default enhancer(Login);
