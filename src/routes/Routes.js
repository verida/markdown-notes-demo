import React from 'react';
import { Route, Switch } from 'react-router';
import ConnectVault from '../views/ConnectVault';
import Editor from '../views/Editor';
import Home from '../views/Home';
import AuthGuard from './AuthGard';

const Routes = () => {
  return (
    <Switch>
      <Route component={ConnectVault} exact path="/connect" />
      <AuthGuard component={Home} exact path="/" />
      <AuthGuard component={Editor} exact path="/editor" />
    </Switch>
  );
};

export default Routes;
