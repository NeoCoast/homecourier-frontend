import React from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userInfo = useSelector((state) => state.logUser.data);
  return (
    <Box fill align="center">
      <Box>
        <Heading>Bienvenido {userInfo.username}</Heading>
      </Box>
    </Box>
  );
};

export default Profile;
