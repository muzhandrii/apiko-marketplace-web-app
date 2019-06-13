import React from 'react';
import T from 'prop-types';
import s from './Bookmarks.module.scss';
import { ProductsContainer } from '../../components';

function Bookmarks({ savedList }) {
  return (
    <div className={s.container}>
      <ProductsContainer products={savedList} />
    </div>
  );
}

Bookmarks.propTypes = {
  savedList: T.array,
};

Bookmarks.defaultProps = {
  savedList: [],
};

export default Bookmarks;
