import React from 'react';
import T from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import s from './PasswordRestore.module.scss';
import { Button } from '../../atoms';
import { routes } from '../router';

function PasswordRestore({
  handleChange,
  passRecover,
  text,
  disabled,
  isModalOpen,
}) {
  return (
    <div className={s.formWrapper}>
      <div className={s.restoreBox}>
        <h3 className={s.restoreBoxTitle}>Restore Password</h3>
        <div className={s.form}>
          <label htmlFor="email" className={s.label}>
            Email
            <input
              className={s.input}
              id="email"
              placeholder="Example@gmail.com"
              type="text"
              value={text}
              autoComplete="off"
              onChange={handleChange}
            />
          </label>

          <Button
            disabled={disabled}
            onClick={passRecover}
            primaryClass="primary-btn"
            type="click"
          >
            Continue
          </Button>
        </div>
      </div>
      <Modal
        overlayClassName={s.modalOverlay}
        className={s.modal}
        isOpen={isModalOpen}
      >
        <h3 className={s.modalTitle}>Instructions was sended on your email</h3>
        <Link className={s.link} to={routes.login}>
          <Button type="button" primaryClass="search-btn">
            Ok
          </Button>
        </Link>
      </Modal>
    </div>
  );
}

PasswordRestore.propTypes = {
  handleChange: T.func,
  disabled: T.bool,
  passRecover: T.func,
  text: T.string,
  isModalOpen: T.bool,
};

PasswordRestore.defaultProps = {
  handleChange: () => {},
  disabled: true,
  passRecover: () => {},
  text: '',
  isModalOpen: false,
};

export default PasswordRestore;
