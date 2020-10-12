import React, { useEffect } from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RateOrder from 'Containers/RateOrder';

const Perfil = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.logUser.data);
  const loggedIn = useSelector((state) => state.logUser.loggedIn);

  useEffect(() => {
    if (!loggedIn) history.push('/login');
  }, [loggedIn]);

  return (
    <Box fill align="center">
      {loggedIn && (
        <Box>
          <Heading>Bienvenido {userInfo.username}</Heading>
          <RateOrder />
        </Box>
      )}
    </Box>
  );
};

export default Perfil;
