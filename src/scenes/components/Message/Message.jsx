import React from 'react';
import T from 'prop-types';
import s from './Message.module.scss';

function Message({ message, sended }) {
  const { text } = message;
  if (sended) {
    return (
      <div className={s.sendedContainer}>
        <div className={s.sendedWrap}>
          <p className={s.sendedMessage}>{text}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={s.receivedContainer}>
      <div className={s.receivedWrap}>
        <p className={s.receivedMessage}>{text}</p>
      </div>
    </div>
  );
}

Message.propTypes = {
  message: T.object,
  sended: T.bool,
};

Message.defaultProps = {
  sended: true,
};

export default Message;
