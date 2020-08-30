import React from 'react';
import PasswordForgetForm from '../PasswordForget/passwordForgetForm';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import LoginManagement from './loginManagement';

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider',
  },
];

function AccountPage() {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <h1>Account: {authUser.email}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
          <LoginManagement authUser={authUser} />
        </div>
      )}
    </AuthUserContext.Consumer>

  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
