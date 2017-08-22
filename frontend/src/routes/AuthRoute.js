import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import * as Auth from '../util/Auth';

const url = window.location.hash;
let CURRENT_URL = '/' + url.substr(2);
const PUBLIC_ROOT = '/login';

const AuthRoute = ({component, ...props}) => {
  const { isPrivate } = component;
  let isLogined = Auth.syncIsLogined();
  // while (typeof isLogined !== 'boolean') {
  //   console.log('in while loop');
  // }
  if (typeof isLogined === 'boolean' && isLogined) {
    //User is Authenticated
    if (isPrivate === true || ! isPrivate) {
      //If the route is private the user may proceed.
      return <Route { ...props } component={ component } />;
      // return <Route { ...props } render={() => (<component/>) } />;
    }
    else {
      //If the route is public, the user is redirected to the app's private root.
      let redirectUrl = CURRENT_URL;
      CURRENT_URL = '/';
      return <Redirect to={ redirectUrl } />;
    }
  }
  else {
    //User is not Authenticated
    if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      return <Redirect to={ PUBLIC_ROOT } />;
    }
    else {
      //If the route is public, the user may proceed.
      return <Route { ...props } component={ component } />;
    }
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

export default AuthRoute;
