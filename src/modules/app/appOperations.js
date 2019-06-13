import * as actions from './appActions';
import Api, { SocketApi } from '../../api';
import { viewerOperations } from '../viewer';
import { messagesOperations } from '../messages';

export function subscribeToSockets() {
  return async function subscribeToSocketsThunk(dispatch) {
    SocketApi.handleMessages((message) =>
      dispatch(messagesOperations.handleMessageRealTime(message)),
    );
  };
}

export function init() {
  return async function initThunk(dispatch) {
    try {
      dispatch(actions.initialization.start());

      Api.init();
      await dispatch(viewerOperations.fetchViewer());

      dispatch(actions.initialization.success());

      dispatch(subscribeToSockets());
    } catch (err) {
      dispatch(actions.initialization.error({ message: err.message }));
    }
  };
}
