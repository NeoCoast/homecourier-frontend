import React, { useEffect } from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const Perfil = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.logUser.data);
  const loggedIn = useSelector((state) => state.logUser.loggedIn);

  useEffect(() => {
    if (!loggedIn) history.push('/login');
  }, [loggedIn]);

  return (
    <Box fill align="center">
      <Heading>Bienvenido {userInfo.username}</Heading>
    </Box>
  );
};

export default Perfil;
