/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from 'Data/constants';

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  const loggedIn = useSelector((state) => state.logUser.loggedIn);

  if (loggedIn) {
    return (
      <Route
        {...routeProps}
        render={(props) => (<Component {...props} />)}
      />

    );
  }

  return (<Redirect to={ROUTES.login} />);
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
