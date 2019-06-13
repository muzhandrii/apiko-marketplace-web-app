import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import s from './Favorite.module.scss';
import { HeartIcon } from '../../../atoms';
import { routes } from '../../router';

function Favorite({ light, path }) {
  const isPainted = path === routes.bookmarks;
  const iconColor = light ? '#33333A' : '#fff';
  return (
    <Link to={routes.bookmarks} className={s.box}>
      <HeartIcon width="20" height="18" painted={isPainted} color={iconColor} />
    </Link>
  );
}

Favorite.propTypes = {
  light: T.bool,
  path: T.string,
};

Favorite.defaultProps = {
  light: false,
  path: '',
};

export default Favorite;
