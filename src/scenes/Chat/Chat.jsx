import React, { Component } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import s from './Chat.module.scss';
import { messagesSelectors, messagesOperations } from '../../modules/messages';
import { chatsSelectors } from '../../modules/chats';
import { Avatar } from '../../atoms';
import { Message } from '../components';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.windowRef = React.createRef();

    this.state = {
      text: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.fetchMessages(this.props.match.params.id);
    this.windowRef.current.scrollTop = this.windowRef.current.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    this.windowRef.current.scrollTop = this.windowRef.current.scrollHeight;
    const { id } = this.props.match.params;
    if (id !== prevProps.match.params.id) {
      this.props.fetchMessages(id);
    }
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  sendMessage(event) {
    if (event.key === 'Enter' && this.state.text.length > 0) {
      this.props.sendMessage(this.props.match.params.id, this.state.text);
      this.setState({ text: '' });
    }
  }

  render() {
    const { location, chat, messages } = this.props;

    const participant = chat.participants
      ? chat.participants[0]
      : location.state.participant;

    const messageList = messages.map((message) => {
      const sended = message.ownerId !== participant.id;
      return <Message key={message.id} message={message} sended={sended} />;
    });
    return (
      <>
        <div className={s.header}>
          <div className={s.avatarWrap}>
            {participant && <Avatar profile={participant} />}
          </div>
          <h5 className={s.participantName}>
            {participant && participant.fullName}
          </h5>
          <div className={s.menuWrap}>
            <div className={s.menuBtn} />
          </div>
        </div>
        <div ref={this.windowRef} className={s.window}>
          {messageList}
        </div>
        <input
          className={s.input}
          placeholder="Type your message here.."
          onChange={this.handleChange}
          onKeyPress={this.sendMessage}
          value={this.state.text}
        />
      </>
    );
  }
}

Chat.propTypes = {
  messages: T.array,
  sendMessage: T.func,
  chat: T.object,
  location: T.object,
  match: T.object,
  fetchMessages: T.func,
};

Chat.defaultProps = {
  messages: null,
  match: null,
  fetchMessages: () => {},
  sendMessage: () => {},
  chat: null,
  location: null,
};

function mapStateToProps(state, { match }) {
  return {
    messages: messagesSelectors.getMessages(state, match.params.id),
    chat: chatsSelectors.getChat(state, match.params.id),
  };
}

const mapDispatchToProps = {
  sendMessage: messagesOperations.sendMessage,
  fetchMessages: messagesOperations.fetchMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
