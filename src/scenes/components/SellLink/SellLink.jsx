import React from 'react';
import { Link } from 'react-router-dom';
import s from './SellLink.module.scss';
import { routes } from '../../router';

function SellLink() {
  return (
    <Link
      to={{ pathname: routes.addProduct, state: { modal: true } }}
      className={s.link}
    >
      Sell
    </Link>
  );
}

export default SellLink;
