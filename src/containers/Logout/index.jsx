import React, { useState } from 'react';
import { Button } from 'grommet';
import { useHistory } from 'react-router-dom';
import usersService from 'Api/users.service';
import { useDispatch } from 'react-redux';
import { logout } from 'Actions/logUser';
import { ROUTES } from 'Data/constants';

const Logout = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await usersService.logout(); // Sends an HTTP.delete to the API
      await dispatch(logout()); // Dispatches Redux's action
      setLoading(false);
      history.push(ROUTES.login); // Redirects to Login page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button disabled={loading} secondary onClick={handleLogout} label="Logout" />
  );
};

export default Logout;
