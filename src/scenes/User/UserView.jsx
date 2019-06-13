import React from 'react';
import T from 'prop-types';
import s from './User.module.scss';
import { Avatar } from '../../atoms';
import { ProductsContainer } from '../../components';

function User({ seller, sellerFetching, products, productsFetching }) {
  return (
    <div className={s.container}>
      {!seller || sellerFetching ? (
        'Loading...'
      ) : (
        <div className={s.seller}>
          <div className={s.avatarWrap}>
            <Avatar profile={seller} />
          </div>
          <h3 className={s.name}>{seller.fullName}</h3>
          <p className={s.location}>{seller.location}</p>
        </div>
      )}
      <div className={s.tabs}>
        <div className={s.feedback}>
          <p className={s.feedbackNumber}>0</p>
          <p className={s.underText}>Positive feedback</p>
        </div>
        <div className={s.sales}>
          <p className={s.salesNumber}>0%</p>
          <p className={s.underText}>Sales</p>
        </div>
        <div className={s.productsWrap}>
          <div className={s.products}>
            <p className={s.productsNumber}>{products.length}</p>
            <p className={s.productsText}>Active Listings</p>
          </div>
        </div>
      </div>
      {productsFetching ? (
        'Loading...'
      ) : (
        <ProductsContainer products={products} />
      )}
    </div>
  );
}

User.propTypes = {
  seller: T.object,
  sellerFetching: T.bool,
  products: T.array,
  productsFetching: T.bool,
};

User.defaultProps = {
  seller: null,
  sellerFetching: false,
  products: null,
  productsFetching: false,
};

export default User;
