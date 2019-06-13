import React from 'react';
import T from 'prop-types';
import { Link, generatePath } from 'react-router-dom';
import s from './ViewerPopover.module.scss';
import { Avatar } from '../../atoms';
import { routes } from '../../scenes/router';

function ViewerPopover({ viewer, handleLogout }) {
  const { fullName, email, id } = viewer;
  return (
    <div className={s.container}>
      <div className={s.topBox}>
        <div className={s.avatarWrap}>
          <Avatar profile={viewer} />
        </div>
        <div className={s.rightBox}>
          <p className={s.name}>{fullName}</p>
          <p className={s.email}>{email}</p>
          <Link to={generatePath(routes.user, { id })} className={s.profile}>
            Profile
          </Link>
        </div>
      </div>
      <Link to={routes.profile} className={s.profileLink}>
        EDIT PROFILE
      </Link>
      <button onClick={handleLogout} className={s.logoutBtn} type="button">
        Logout
      </button>
    </div>
  );
}

ViewerPopover.propTypes = {
  viewer: T.object.isRequired,
  handleLogout: T.func,
};

ViewerPopover.defaultProps = {
  handleLogout: () => {},
};

export default ViewerPopover;
