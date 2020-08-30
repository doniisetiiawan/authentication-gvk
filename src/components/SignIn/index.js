import React from 'react';
import SignUpLink from '../SignUp/signUpLink';
import SignInForm from './signInForm';
import PasswordForgetLink from '../PasswordForget/passwordForgetLink';
import SignInGoogle from './signInGoogle';
import SignInFacebook from './signInFacebook';
import SignInTwitter from './signInTwitter';

function SignInPage() {
  return (
    <div>
      <SignInForm />
      <SignInGoogle />
      <SignInFacebook />
      <SignInTwitter />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
}

export default SignInPage;
