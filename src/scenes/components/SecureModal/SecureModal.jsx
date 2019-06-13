import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import s from './SecureModal.module.scss';
import { Button } from '../../../atoms';
import { routes } from '../../router';

function SecureModal({ closeModal }) {
  return (
    <div className={s.container}>
      <h3 className={s.modalTitle}>Please log in to contact with seller</h3>
      <div className={s.buttonsWrap}>
        <Button onClick={closeModal} type="button" primaryClass="favorite-btn">
          Stay here
        </Button>
        <Link
          className={s.link}
          to={{ pathname: routes.login, state: 'product' }}
        >
          <Button type="button" primaryClass="primary-btn">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

SecureModal.propTypes = {
  closeModal: T.func,
  productId: T.string,
};

SecureModal.defaultProps = {
  closeModal: () => {},
  productId: '',
};

export default SecureModal;
