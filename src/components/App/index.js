import React from 'react';
import { hot } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
import * as ROUTES from '../../constants/routes';
import Landing from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AdminPage from '../Admin';
import AccountPage from '../Account';

const Index = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route
        exact
        path={ROUTES.LANDING}
        component={Landing}
      />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route
        path={ROUTES.ACCOUNT}
        component={AccountPage}
      />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default hot(module)(Index);
