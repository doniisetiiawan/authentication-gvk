import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFacebookBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  onSubmit = (event) => {
    const { history, firebase } = this.props;
    firebase
      .doSignInWithFacebook()
      .then((socialAuthUser) => firebase
        .user(socialAuthUser.user.uid)
        .set({
          username:
              socialAuthUser.additionalUserInfo.profile
                .name,
          email:
              socialAuthUser.additionalUserInfo.profile
                .email,
          roles: {},
        }))
      .then(() => {
        this.setState({ error: null });
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

export default SignInFacebook;
