import React from 'react';
import T from 'prop-types';
import s from './ContactSellerModal.module.scss';
import { Avatar, Button } from '../../atoms';

function ContactSellerModal({
  product,
  owner,
  closeModal,
  submit,
  text,
  handleChange,
  disabled,
  isLoading,
}) {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Contact Seller</h3>
      <h4 className={s.productName}>{`Subject: ${product.title}`}</h4>
      <div className={s.seller}>
        <div className={s.avatarWrap}>
          <Avatar profile={owner} />
        </div>
        <div>
          <p className={s.name}>{owner.fullName}</p>
          <p className={s.location}>{owner.location}</p>
        </div>
      </div>
      <div className={s.form}>
        <label className={s.label} htmlFor="message">
          Message
          <textarea
            id="message"
            className={s.textarea}
            value={text}
            onChange={handleChange}
          />
        </label>
        <div className={s.buttonWrap}>
          <Button
            disabled={disabled}
            onClick={submit}
            type="submit"
            primaryClass="primary-btn"
          >
            {isLoading ? 'Loading...' : ' SUBMIT'}
          </Button>
        </div>
      </div>

      <button onClick={closeModal} className={s.close} type="button" />
    </div>
  );
}

ContactSellerModal.propTypes = {
  product: T.object.isRequired,
  owner: T.object.isRequired,
  closeModal: T.func,
  submit: T.func,
  text: T.string,
  handleChange: T.func,
  disabled: T.bool,
  isLoading: T.bool,
};

ContactSellerModal.defaultProps = {
  closeModal: () => {},
  submit: () => {},
  text: '',
  handleChange: () => {},
  disabled: false,
  isLoading: false,
};

export default ContactSellerModal;
