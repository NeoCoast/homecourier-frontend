import React from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import { useSelector } from 'react-redux';

const Perfil = () => {
  const userInfo = useSelector((state) => state.logUser.data);

  return (
    <Box fill align="center">
      <Heading>Bienvenido {userInfo.username}</Heading>
    </Box>
  );
};

export default Perfil;
