import React from 'react';
import T from 'prop-types';
import { Link, generatePath } from 'react-router-dom';
import Modal from 'react-modal';
import s from './Product.module.scss';
import { routes } from '../router';
import { Avatar, Button, HeartIcon } from '../../atoms';
import ContactSellerModal from '../ContactSellerModal/ContactSellerModalContainer';
import { SecureModal } from '../components';

Modal.setAppElement('#root');

function Product({
  product,
  isImageError,
  isLoading,
  owner,
  imageErrorHandler,
  toggleModal,
  isModalOpen,
  viewer,
  saveHandler,
}) {
  const shouldShowingLoading = isLoading || !owner;
  if (!product) {
    return <h1>Loading...</h1>;
  }
  const { photos, title, price, description, location, createdAt } = product;
  const photo = photos && photos[0];
  const placeholder =
    'https://via.placeholder.com/576x274.png?text=NO PRODUCT IMAGE';
  let productPhoto = photo || placeholder;
  if (isImageError) {
    productPhoto = placeholder;
  }

  function timeSince(date) {
    const sec = Math.floor((+new Date() - date) / 1000);
    const hour = 60 * 60;
    const day = 60 * 60 * 24;
    const hours = Math.floor(sec / hour);
    const days = Math.floor(sec / day);
    const ds = ` day${days > 1 ? 's' : ''}`;
    const hs = ` hour${hour > 1 ? 's' : ''}`;
    if (hours < 24) {
      return ` ${hours}${hs} ago`;
    }
    return ` ${days}${ds} ago`;
  }

  return (
    <div className={s.container}>
      <div className={s.product}>
        <div className={s.imageWrap}>
          <img
            src={productPhoto}
            className={s.image}
            alt={title}
            onError={imageErrorHandler}
          />
        </div>

        <div className={s.titleWrap}>
          <h4 className={s.title}>
            {title}
            <span className={s.titleDate}>{`${timeSince(createdAt)}`}</span>
          </h4>
        </div>
        <div className={s.price}>{`$${price}`}</div>
        <div className={s.location}>
          <img
            className={s.locationIcon}
            src="/images/icons/location.svg"
            alt=""
          />
          <p className={s.locationText}>{location}</p>
        </div>
        <p className={s.description}>{description}</p>
      </div>

      <div className={s.sellerContainer}>
        {shouldShowingLoading ? (
          'Loading...'
        ) : (
          <div className={s.seller}>
            <Link
              to={generatePath(routes.user, { id: owner.id })}
              className={s.sellerName}
            >
              {owner.fullName}
            </Link>
            <p className={s.sellerLocation}>{owner.location}</p>
            <div className={s.avatarWrap}>
              <Avatar profile={owner} />
            </div>
          </div>
        )}
        <div className={s.button}>
          <Button
            primaryClass="primary-btn"
            onClick={toggleModal}
            type="button"
          >
            CHAT WITH SELLER
          </Button>
        </div>
        <Modal
          overlayClassName={s.modalOverlay}
          className={s.modal}
          isOpen={isModalOpen}
        >
          {viewer ? (
            <ContactSellerModal
              product={product}
              owner={owner}
              closeModal={toggleModal}
            />
          ) : (
            <SecureModal closeModal={toggleModal} />
          )}
        </Modal>
        <Button primaryClass="favorite-btn" onClick={saveHandler} type="button">
          <>
            <div className={s.heartIcon}>
                {product.saved ? (
                <HeartIcon width="17" height="15" color="#349A89" painted />
              ) : (
                <HeartIcon width="17" height="15" color="#535353" />
              )}
            </div>
            ADD TO FAVORITE
          </>
        </Button>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: T.object,
  owner: T.object,
  isLoading: T.bool,
  isImageError: T.bool,
  imageErrorHandler: T.func,
  toggleModal: T.func,
  isModalOpen: T.bool,
  viewer: T.object,
  saveHandler: T.func,
};

Product.defaultProps = {
  isLoading: false,
  product: null,
  owner: null,
  isModalOpen: false,
  viewer: null,
  isImageError: false,
  imageErrorHandler: () => {},
  toggleModal: () => {},
  saveHandler: () => {},
};

export default Product;
