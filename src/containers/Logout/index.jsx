import React from 'react';
import { Button } from 'grommet';
import { useHistory } from 'react-router-dom';
import usersService from 'Api/users.service';
import { useDispatch } from 'react-redux';
import { logout } from 'Actions/logUser';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await usersService.logout(); // Sends an HTTP.delete to the API
      await dispatch(logout()); // Dispatches Redux's action
      history.push('/login'); // Redirects to Login page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button secondary onClick={handleLogout} label="Logout" />
  );
};

export default Logout;
