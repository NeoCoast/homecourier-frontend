import React from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userInfo = useSelector((state) => state.logUser.data);
  const loggedIn = (undefined === useSelector((state) => state.logUser.loggedIn));

  return (
    <Box fill align="center">
      {loggedIn && (
        <Box>
          <Heading>Bienvenido {userInfo.username}</Heading>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
