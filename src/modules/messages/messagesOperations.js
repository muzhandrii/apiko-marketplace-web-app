import { normalize } from 'normalizr';
import * as actions from './messagesActions';
import Api, { schemas } from '../../api';
import { createMessage } from './messagesCreator';
import { viewerSelectors } from '../viewer';

export function sendMessage(chatId, text) {
  return async function sendMessageThunk(dispatch, getState) {
    const user = viewerSelectors.getViewer(getState());
    const message = createMessage({ text, chatId, ownerId: user.id });
    try {
      dispatch(
        actions.sendMessage.start({
          chatId,
          ...normalize(message, schemas.Message),
        }),
      );

      const res = await Api.Messages.sendMessage(chatId, text);
      const { result, entities } = normalize(res.data, schemas.Message);

      dispatch(
        actions.sendMessage.success({
          oldMessageId: message.id,
          result,
          entities,
          chatId,
        }),
      );
    } catch (err) {
      dispatch(actions.sendMessage.error({ message: err.message }));
    }
  };
}

export function fetchMessages(chatId) {
  return async function fetchMessagesThunk(dispatch) {
    try {
      dispatch(actions.fetchMessages.start());

      const res = await Api.Messages.fetchMessages(chatId);
      const { result, entities } = normalize(
        res.data,
        schemas.MessageCollection,
      );

      dispatch(actions.fetchMessages.success({ result, entities, chatId }));
    } catch (err) {
      dispatch(actions.fetchMessages.error({ message: err.message }));
    }
  };
}

export function handleMessageRealTime(event) {
  return async function handleMessageRealTimeThunk(dispatch) {
    if (event.type === 'ADD') {
      dispatch(addMessage(event.message));
    }
  };
}

export function addMessage(message) {
  return async function addMessageThunk(dispatch) {
    dispatch(
      actions.sendMessage.start({
        chatId: message.chatId,
        ...normalize(message, schemas.Message),
      }),
    );
  };
}
