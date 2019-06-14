import { compose, withState, withHandlers, withProps } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, generatePath } from 'react-router-dom';
import ContactSellerModal from './ContactSellerModalView';
import { routes } from '../router';
import { messagesOperations } from '../../modules/messages';
import { chatsOperations } from '../../modules/chats';
import { viewerSelectors } from '../../modules/viewer';

const mapDispatchToProps = {
  createChat: chatsOperations.createChat,
  sendMessage: messagesOperations.sendMessage,
};

function mapStateToProps(state) {
  return {
    isLoading: state.messages.sendMessage.isLoading,
    chat: state.chats.items,
    viewer: viewerSelectors.getViewer(state),
  };
}

const enhancer = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('text', 'setMessage', ''),
  withHandlers({
    handleChange: ({ setMessage }) => (event) => {
      setMessage(event.target.value);
    },
    submit: ({
      product,
      createChat,
      setMessage,
      text,
      sendMessage,
      history,
      owner,
      viewer,
    }) => async (event) => {
      text = text.trim();
      event.preventDefault();
      if (viewer.id === owner.id) {
        return false;
      }
      if (!product.chatId) {
        const data = await createChat(product.id, text);
        sendMessage(data.result, text);
        setMessage('');
        history.push({
          pathname: generatePath(routes.chat, { id: data.result }),
          state: { participant: owner },
        });
      } else {
        await sendMessage(product.chatId, text);
        setMessage('');
        history.push(generatePath(routes.chat, { id: product.chatId }));
      }
    },
  }),
  withProps(({ text }) => ({
    disabled: text.trim().length === 0,
  })),
);

export default enhancer(ContactSellerModal);
