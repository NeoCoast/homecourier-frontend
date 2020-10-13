/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from 'Data/constants';

const PublicOnlyRoute = ({ component: Component, ...routeProps }) => {
  const loggedIn = useSelector((state) => state.logUser.loggedIn);
  const userData = useSelector((state) => state.logUser.data);

  if (loggedIn && userData && userData.documentNumber) {
    return (<Redirect to={ROUTES.orders} />);
  }

  if (loggedIn) {
    return (<Redirect to={ROUTES.profile} />);
  }

  return (
    <Route
      {...routeProps}
      render={(props) => (<Component {...props} />)}
    />
  );
};

PublicOnlyRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicOnlyRoute;
