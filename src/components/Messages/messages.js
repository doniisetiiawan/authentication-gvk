import React from 'react';
import MessageList from './messageList';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.messages().off();
  }

  onListenForMessages() {
    this.setState({ loading: true });

    const { firebase } = this.props;
    const { limit } = this.state;
    firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(limit)
      .on('value', (snapshot) => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(
            messageObject,
          ).map((key) => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  }

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    const { firebase } = this.props;
    const { text } = this.state;
    firebase.messages().push({
      text,
      userId: authUser.uid,
      createdAt: firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    const { firebase } = this.props;
    firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = (uid) => {
    const { firebase } = this.props;
    firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {!loading && messages && (
              <button
                type="button"
                onClick={this.onNextPage}
              >
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages ? (
              <MessageList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            ) : (
              <div>There are no messages ...</div>
            )}

            <form
              onSubmit={(event) => this.onCreateMessage(event, authUser)}
            >
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
