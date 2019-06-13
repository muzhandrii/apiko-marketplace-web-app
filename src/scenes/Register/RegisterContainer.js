import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, generatePath } from 'react-router-dom';
import Register from './RegisterView';
import { authOperations } from '../../modules/auth';
import { routes } from '../router';
import { productsOperations } from '../../modules/products';

function mapStateToProps(state) {
  return {
    isLoading: state.auth.register.isLoading,
    error: state.auth.register.error,
  };
}

const mapDispatchToProps = {
  register: authOperations.register,
  addProduct: productsOperations.addProduct,
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
    handlePasswordToggle: ({ passwordToggle, isPasswordVisible }) => () => {
      passwordToggle(!isPasswordVisible);
    },
    errorToggle: ({ errorHandler }) => (value) => {
      errorHandler(value);
    },
    handleRegister: ({
      errorHandler,
      register,
      history,
      location,
      addProduct,
    }) => async (body) => {
      try {
        await register(body);
        if (location.state.product) {
          const resp = await addProduct(location.state.product);
          history.push(generatePath(routes.product, { id: resp.result }));
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

export default enhancer(Register);
