import React from 'react';
import PasswordForgetForm from '../PasswordForget/passwordForgetForm';
import PasswordChangeForm from '../PasswordChange';

function AccountPage() {
  return (
    <div>
      <h1>Account Page</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
}

export default AccountPage;
