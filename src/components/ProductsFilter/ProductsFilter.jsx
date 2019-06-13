import React from 'react';
import s from './ProductsFilter.module.scss';

function ProductsFilter() {
  return (
    <div className={s.container}>
      <div className={s.select}>
        <img className={s.selectIcon} src="/images/icons/grid.svg" alt="" />
        <p className={s.selectText}>Chose Category</p>
      </div>
      <input type="text" className={s.price} placeholder="Price from (USD)" />
      <div className={s.line} />
      <input type="text" className={s.price} placeholder="Price from (USD)" />
    </div>
  );
}

export default ProductsFilter;
