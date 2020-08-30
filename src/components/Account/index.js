import React from 'react';
import PasswordForgetForm from '../PasswordForget/passwordForgetForm';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

function AccountPage() {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <h1>Account: {authUser.email}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
        </div>
      )}
    </AuthUserContext.Consumer>

  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
