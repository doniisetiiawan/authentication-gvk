import React from 'react';
import { compose } from 'recompose';
import { Switch, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import UserList from './userList';
import {
  withAuthorization,
  withEmailVerification,
} from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import UserItem from './userItem';

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>
      The Admin Page is accessible by every signed in admin
      user.
    </p>

    <Switch>
      <Route
        exact
        path={ROUTES.ADMIN_DETAILS}
        component={UserItem}
      />
      <Route
        exact
        path={ROUTES.ADMIN}
        component={UserList}
      />
    </Switch>
  </div>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
