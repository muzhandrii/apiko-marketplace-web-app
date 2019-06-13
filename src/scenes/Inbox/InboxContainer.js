import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import Inbox from './InboxView';
import { chatsOperations, chatsSelectors } from '../../modules/chats';

function mapStateToProps(state) {
  return {
    isLoading: state.chats.fetchChats.isLoading,
    chatsList: chatsSelectors.getChatsWithLastMessage(state),
  };
}

const mapDispatchToProps = {
  fetchChats: chatsOperations.fetchChats,
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchChats();
    },
  }),
);

export default enhancer(Inbox);
