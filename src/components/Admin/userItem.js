import React from 'react';
import { withFirebase } from '../Firebase';

class UserItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    const { user } = this.state;
    if (user) {
      return;
    }

    this.setState({ loading: true });

    const { match, firebase } = this.props;
    firebase
      .user(match.params.id)
      .on('value', (snapshot) => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    const { match, firebase } = this.props;
    firebase.user(match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    const { firebase } = this.props;
    const { user } = this.state;
    firebase.doPasswordReset(user.email);
  };

  render() {
    const { user, loading } = this.state;
    const { match } = this.props;

    return (
      <div>
        <h2>User ({match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <button
                type="button"
                onClick={this.onSendPasswordResetEmail}
              >
                Send Password Reset
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(UserItem);
