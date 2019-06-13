import React from 'react';
import T from 'prop-types';
import { Link, generatePath } from 'react-router-dom';
import s from './ProductCard.module.scss';
import { routes } from '../../scenes/router';
import { HeartIcon } from '../../atoms';

function ProductCard({
  product,
  imageErrorHandler,
  isImageError,
  saveHandler,
}) {
  const { title, price, photos, id, saved } = product;
  const photo = photos && photos[0];
  const placeholder =
    'https://via.placeholder.com/200x146.png?text=NO PRODUCT IMAGE';
  let productPhoto = photo || placeholder;
  if (isImageError) {
    productPhoto = placeholder;
  }
  return (
    <Link className={s.link} to={generatePath(routes.product, { id })}>
      <div className={s.product}>
        <div className={s.innerContainer}>
          <img
            className={s.image}
            src={productPhoto}
            alt={title}
            onError={imageErrorHandler}
          />
        </div>
        <h6 className={s.title}>{title}</h6>
        <p className={s.price}>{`$${price}`}</p>
        <div className={s.heartContainer} onClick={saveHandler}>
          {saved ? (
            <HeartIcon width="17" height="15" color="#349A89" painted />
          ) : (
            <HeartIcon width="17" height="15" color="#B7B7B7" />
          )}
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: T.object.isRequired,
  isImageError: T.bool,
  imageErrorHandler: T.func,
  saveHandler: T.func,
};

ProductCard.defaultProps = {
  isImageError: false,
  imageErrorHandler: () => {},
  saveHandler: () => {},
};

export default ProductCard;
