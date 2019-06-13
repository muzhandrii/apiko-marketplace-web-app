import uuid from 'uuid/v4';

export const createMessage = ({ text, chatId, ownerId }) => ({
  id: uuid(),
  text,
  chatId,
  createdAt: new Date().getTime(),
  ownerId,
});
