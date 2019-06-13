import { createAsyncActions } from '@letapp/redux-actions';

export const sendMessage = createAsyncActions('messages/SEND_MESSAGE');
export const fetchMessages = createAsyncActions('messages/FETCH_MESSAGES');
