import React from 'react';
import NavigationAuth from './navigationAuth';
import NavigationNonAuth from './navigationNonAuth';
import { AuthUserContext } from '../Session';

function Navigation() {
  return (
    <div>
      <AuthUserContext.Consumer>
        {(authUser) => (authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        ))}
      </AuthUserContext.Consumer>
    </div>
  );
}

export default Navigation;
