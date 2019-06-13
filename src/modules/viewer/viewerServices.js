import randomColor from 'randomcolor';

export function avatarColorSetter(data) {
  const background = randomColor({
    luminosity: 'dark',
    hue: 'random',
  });
  const styles = { background };
  if (data.hasOwnProperty('owner')) {
    return {
      ...data,
      owner: { ...data.owner, styles },
    };
  }
  return {
    ...data,
    styles,
  };
}

export function permanentAvatarColor(stateUser, propsUser) {
  if (!stateUser) {
    return propsUser;
  }
  if (stateUser.id !== propsUser.id) {
    return propsUser;
  }
  const user = {
    ...propsUser,
    styles: stateUser.styles,
  };
  return user;
}
