import React from 'react';
import { Button } from 'grommet';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import usersService from '../../api/users.service';

const Logout = (props) => {
  const history = useHistory();
  const handleLogout = () => {
    props.logout();
    try {
      props.logout();
      usersService.logout();
      history.push('/');
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <Button secondary onClick={handleLogout} label="Logout" />
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Logout;
