import React from 'react';
import T from 'prop-types';
import { Route } from 'react-router-dom';
import s from './Inbox.module.scss';
import { Header } from '../../components';
import { SellLink, ChatCard } from '../components';
import { routes } from '../router';
import Chat from '../Chat/Chat';

function Inbox({ chatsList, isLoading }) {
  let chats;
  try {
    chats = chatsList
      .sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt)
      .map((item) => <ChatCard key={item.id} chat={item} />);
  } catch (error) {
    chats = chatsList.map((item) => <ChatCard key={item.id} chat={item} />);
  }

  return (
    <div className={s.container}>
      <Header>
        <SellLink />
      </Header>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className={s.chatsBox}>
          <aside className={s.aside}>{chats}</aside>
          <div className={s.main}>
            <Route exact path={routes.chat} component={Chat} />
          </div>
        </div>
      )}
    </div>
  );
}

Inbox.propTypes = {
  chatsList: T.array,
  isLoading: T.bool,
};

Inbox.defaultProps = {
  chatsList: null,
  isLoading: false,
};

export default Inbox;
