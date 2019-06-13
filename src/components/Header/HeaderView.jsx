import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';
import { routes } from '../../scenes/router';
import { Logo, Avatar } from '../../atoms';
import { Favorite } from '../../scenes/components';
import ViewerPopover from '../ViewerPopover/ViewerPopover';

function Header({
  viewer,
  light,
  children,
  location,
  handleLogout,
  handlePopoverToggle,
  isPopoverVisible,
}) {
  const headerColor = light
    ? { background: 'transparent', color: '#2B2B2B' }
    : { color: '#fff' };
  return (
    <header style={headerColor} className={s.header}>
      <div className={s.container}>
        <Logo light={light} path={location.pathname} />
        <div className={s.childrenContainer}>{children}</div>
        <div className={s.rightContainer}>
          {viewer ? (
            <div onClick={handlePopoverToggle} className={s.avatarWrap}>
              <Avatar profile={viewer} />
              {isPopoverVisible && (
                <ViewerPopover viewer={viewer} handleLogout={handleLogout} />
              )}
            </div>
          ) : (
            <Link className={s.authLink} to={routes.login}>
              LOGIN
            </Link>
          )}
          <Favorite light={light} path={location.pathname} />
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  light: T.bool,
  children: T.oneOfType([T.element, T.array]),
  handleLogout: T.func,
  viewer: T.object,
  handlePopoverToggle: T.func,
  isPopoverVisible: T.bool,
  location: T.object.isRequired,
};

Header.defaultProps = {
  light: false,
  children: null,
  handlePopoverToggle: () => {},
  handleLogout: () => {},
  isPopoverVisible: false,
  viewer: null,
};

export default Header;
