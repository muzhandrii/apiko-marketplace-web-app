import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import s from './Login.module.scss';
import { routes } from '../router';
import { Button } from '../../atoms';
import { FormInput } from '../components';
import { loginSchema } from '../../utils/validationSchemas';
import { setErrorMessage } from '../../utils/ServerErrorHandler';

function Login({
  handleLogin,
  isLoading,
  handlePasswordToggle,
  isPasswordVisible,
  error,
  showError,
  errorToggle,
}) {
  return (
    <div className={s.formWrapper}>
      <div className={s.loginBox}>
        <h3 className={s.loginBox__title}>Login</h3>
        <div className={s.error}>
          {error && showError && setErrorMessage(error)}
        </div>
        <Formik
          validationSchema={loginSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (body) => {
            await handleLogin(body);
          }}
        >
          {() => (
            <Form className={s.form}>
              <Field
                primaryClass="authInput"
                label="EMAIL"
                name="email"
                onFocus={() => errorToggle(false)}
                placeholder="Example@gmail.com"
                type="mail"
                component={FormInput}
              />
              <div className={s.container}>
                <Field
                  primaryClass="authInput"
                  label="PASSWORD"
                  name="password"
                  onFocus={() => errorToggle(false)}
                  type={isPasswordVisible ? 'text' : 'password'}
                  component={FormInput}
                />
                <img
                  src="/images/icons/eye.svg"
                  onClick={handlePasswordToggle}
                  className={s.eyeIcon}
                  alt="eye"
                />
              </div>
              <div className={s.btnWrap}>
                <Link to={routes.passwordRestore} className={s.passRecoverLink}>
                  Don't remember password?
                </Link>
                <Button primaryClass="primary-btn" type="submit">
                  {isLoading ? 'Loading...' : 'Continue'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={s.linkBox}>
        <p className={s.linkBox__text}>
          I have no account,
          <Link className={s.linkBox__link} to={routes.register}>
            {' '}
            REGISTER NOW
          </Link>
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  handleLogin: T.func,
  isLoading: T.bool,
  handlePasswordToggle: T.func,
  isPasswordVisible: T.bool,
  error: T.object,
  showError: T.bool,
  errorToggle: T.func,
};

Login.defaultProps = {
  handleLogin: () => {},
  handlePasswordToggle: () => {},
  isPasswordVisible: false,
  isLoading: false,
  error: null,
  showError: false,
  errorToggle: () => {},
};

export default Login;
