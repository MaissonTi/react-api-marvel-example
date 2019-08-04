/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Characters from './pages/Characters';
import Comics from './pages/Comics';
import Auth from './pages/Auth';

import KeyMarvel from './services/keymarvel';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/init" component={Auth} />
      <PrivateRoute path="/" exact component={Characters} />
      <PrivateRoute path="/comic/:id" component={Comics} />
    </Switch>
  </BrowserRouter>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      KeyMarvel.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/init', state: { from: props.location } }} />
      )
    }
  />
);

export default Routes;
