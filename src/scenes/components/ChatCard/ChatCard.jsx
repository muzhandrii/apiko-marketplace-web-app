import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import T from 'prop-types';
import { routes } from '../../router';
import s from './ChatCard.module.scss';

function ChatCard({ chat }) {
  const messageDate = chat.lastMessage && new Date(chat.lastMessage.createdAt);
  return (
    <Link
      to={generatePath(routes.chat, { id: chat.id })}
      className={s.chatItem}
      key={chat.id}
    >
      <p className={s.productName}>
        {chat.product && chat.product.title}
        <span className={s.messageTime}>
          {chat.lastMessage &&
            `${messageDate.getHours()}:${messageDate.getMinutes()} ${
              messageDate.getHours() > 12 ? 'PM' : 'AM'
            }`}
        </span>
      </p>
      <p className={s.lastMessage}>
        {chat.lastMessage && chat.lastMessage.text}
      </p>
    </Link>
  );
}

ChatCard.propTypes = {
  chat: T.object.isRequired,
};

export default ChatCard;
