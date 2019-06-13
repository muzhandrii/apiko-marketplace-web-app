import React from 'react';
import { Header, Footer } from '../../components';
import s from './AddProduct.module.scss';
import { AddProductForm } from '../components';

function AddProduct() {
  return (
    <>
      <Header />
      <div className={s.container}>
        <AddProductForm />
      </div>
      <Footer />
    </>
  );
}

export default AddProduct;
