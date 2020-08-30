import React from 'react';
import SignUpLink from '../SignUp/signUpLink';
import SignInForm from './signInForm';
import PasswordForgetLink from '../PasswordForget/passwordForgetLink';

function SignInPage() {
  return (
    <div>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
}

export default SignInPage;
