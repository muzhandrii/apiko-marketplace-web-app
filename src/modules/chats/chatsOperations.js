import { normalize } from 'normalizr';
import * as actions from './chatsActions';
import Api, { schemas } from '../../api';

export function createChat(productId) {
  return async function createChatThunk(dispatch) {
    try {
      dispatch(actions.createChat.start());

      const result = await Api.Chats.createChat(productId);

      const data = normalize(result.data, schemas.Chat);

      dispatch(actions.createChat.success(data));

      return data;
    } catch (err) {
      dispatch(actions.createChat.error({ message: err.message }));
    }
  };
}

export function fetchChats() {
  return async function fetchChatsThunk(dispatch) {
    try {
      dispatch(actions.fetchChats.start());

      const result = await Api.Chats.fetchChats();
      const data = normalize(result.data, schemas.ChatCollection);

      dispatch(actions.fetchChats.success(data));
    } catch (err) {
      dispatch(actions.fetchChats.error({ message: err.message }));
    }
  };
}
