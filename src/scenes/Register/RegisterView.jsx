import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { routes } from '../router';
import { Button } from '../../atoms';
import { FormInput } from '../components';
import s from './Register.module.scss';
import { registerSchema } from '../../utils/validationSchemas';
import { setErrorMessage } from '../../utils/ServerErrorHandler';

function Register({
  handleRegister,
  isLoading,
  handlePasswordToggle,
  isPasswordVisible,
  error,
  showError,
  errorToggle,
}) {
  return (
    <div className={s.formWrapper}>
      <div className={s.registerBox}>
        <h3 className={s.registerBox__title}>Register</h3>
        <div className={s.error}>
          {error && showError && setErrorMessage(error)}
        </div>
        <Formik
          validationSchema={registerSchema}
          initialValues={{
            email: '',
            fullName: '',
            password: '',
            passwordAgain: '',
          }}
          onSubmit={(body) => {
            const request = {
              email: body.email.trim(),
              fullName: body.fullName.trim(),
              password: body.password,
            };
            handleRegister(request);
          }}
        >
          {() => (
            <Form className={s.form}>
              <Field
                primaryClass="authInput"
                label="email"
                name="email"
                placeholder="Example@gmail.com"
                type="mail"
                autoComplete="off"
                onFocus={() => errorToggle(false)}
                component={FormInput}
              />
              <Field
                primaryClass="authInput"
                label="full name"
                autoComplete="off"
                name="fullName"
                type="text"
                onFocus={() => errorToggle(false)}
                component={FormInput}
              />
              <div className={s.container}>
                <Field
                  primaryClass="authInput"
                  label="password"
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
              <div className={s.container}>
                <Field
                  primaryClass="authInput"
                  label="password again"
                  name="passwordAgain"
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
              <div className={s.btnWrap} />
              <Button primaryClass="primary-btn" type="submit">
                {isLoading ? 'Loading...' : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className={s.linkBox}>
        <p className={s.linkBox__text}>
          I already have an account,
          <Link className={s.linkBox__link} to={routes.login}>
            {' '}
            LOG IN
          </Link>
        </p>
      </div>
    </div>
  );
}

Register.propTypes = {
  handleRegister: T.func,
  isLoading: T.bool,
  handlePasswordToggle: T.func,
  isPasswordVisible: T.bool,
  error: T.object,
  showError: T.bool,
  errorToggle: T.func,
};

Register.defaultProps = {
  handleRegister: () => {},
  handlePasswordToggle: () => {},
  isPasswordVisible: false,
  isLoading: false,
  error: null,
  showError: false,
  errorToggle: () => {},
};

export default Register;
