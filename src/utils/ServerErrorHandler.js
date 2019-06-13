export function setErrorMessage(error) {
  const errorCode = error.message.slice(-3);
  let message;
  if (errorCode === '401') {
    message = 'Wrong password!';
  } else if (errorCode === '404') {
    message = 'User not found!';
  } else if (errorCode === '409') {
    message = 'Email already used!';
  } else {
    message = 'Some thing went wrong!';
  }

  return message;
}
