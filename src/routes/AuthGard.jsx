/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { VERIDA_USER_SIGNATURE } from '../constants';
import Store from '../utils/store';

const AuthGuard = (props) => {
  const { location, component: Component, ...rest } = props;
  const decryptedSignature = Store.get(VERIDA_USER_SIGNATURE);

  return (
    <Route
      {...rest}
      render={(props) =>
        decryptedSignature ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/connect',
              state: props.location
            }}
          />
        )
      }
    />
  );
};

AuthGuard.prototype = {
  location: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired
};

export default AuthGuard;
