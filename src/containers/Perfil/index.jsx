import React, { useEffect, useState } from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import PropTypes from 'prop-types';

const Perfil = (props) => {
  const [userData, setUserData] = useState('');
  useEffect(() => {
    if (!props.userInfo) { props.history.push('/login'); } else setUserData(props.userInfo);
  }, []);
  return (
    <Box fill align="center">
      <Heading>Bienvenido {userData.username}</Heading>
    </Box>
  );
};

Perfil.propTypes = {
  userInfo: PropTypes.object,
  history: PropTypes.object.isRequired,
};

Perfil.defaultProps = {
  userInfo: undefined,
};

export default Perfil;
