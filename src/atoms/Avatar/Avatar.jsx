import React from 'react';
import T from 'prop-types';
import s from './Avatar.module.scss';

function Avatar({ profile }) {
  const nameArr = profile.fullName.split(' ');
  const initials = `${
    nameArr.length >= 2
      ? `${nameArr[0].charAt(0)}${nameArr[1].charAt(0)}`
      : nameArr[0].charAt(0)
  }`;

  return (
    <div
      className={s.container}
      style={profile.styles}
      title={profile.fullName}
    >
      {profile.avatar ? (
        <img src="profile.avatar" alt="profile.fullName" />
      ) : (
        <span className={s.initials}>{initials}</span>
      )}
    </div>
  );
}

Avatar.propTypes = {
  profile: T.object.isRequired,
};

export default Avatar;
