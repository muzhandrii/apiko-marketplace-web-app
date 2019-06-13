import React from 'react';
import ReactDOM from 'react-dom';
import s from './AddProductModal.module.scss';
import { AddProductForm } from '../components';

function AddProductModal({ history }) {
  const closeModal = (event) => {
    if (event.target.id === 'modal') {
      event.stopPropagation();
      history.goBack();
    }
  };
  return ReactDOM.createPortal(
    <div
      id="modal"
      className={s.modalContainer}
      onClick={closeModal}
      role="modal"
    >
      <div className={s.container}>
        <AddProductForm />
      </div>
    </div>,
    document.getElementById('root'),
  );
}

export default AddProductModal;
