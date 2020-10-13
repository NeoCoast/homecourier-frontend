import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Anchor } from 'grommet';
import { Login, Home } from 'grommet-icons';
import { ROUTES } from 'Data/constants';

const BarButton = () => {
  const location = useLocation();

  const [onHoverHome, setOnHoverHome] = useState(false);
  const [onHoverLogin, setOnHoverLogin] = useState(false);

  useEffect(() => {
    if (location.pathname === ROUTES.home) {
      setOnHoverHome(true);
    }
    if (location.pathname === ROUTES.login) {
      setOnHoverLogin(true);
    }
  }, [onHoverHome, onHoverLogin]);

  const expandItem = (setTrue) => {
    setTimeout(() => setTrue(true), 300);
  };
  const contractItem = (setFalse) => {
    setTimeout(() => setFalse(false), 300);
  };

  return (
    <Box direction="row-responsive" gap="medium" justify="end" align="center" fill pad={{ right: 'small' }}>
      <Link
        to="/"
        onMouseEnter={() => expandItem(setOnHoverHome)}
        onMouseLeave={() => location.pathname !== ROUTES.home ? contractItem(setOnHoverHome) : null}
        onClick={() => contractItem(setOnHoverLogin)}
      >
        <Anchor icon={<Home />} label={onHoverHome ? (<Box animation="slideRight">Inicio</Box>) : ''} as="span" />
      </Link>
      <Link
        to="/login"
        onMouseEnter={() => expandItem(setOnHoverLogin)}
        onMouseLeave={() => location.pathname === ROUTES.login ? null
          : contractItem(setOnHoverLogin)}
        onClick={() => contractItem(setOnHoverHome)}
      >
        <Anchor icon={<Login />} label={onHoverLogin ? (<Box animation="slideRight">Iniciar sesión</Box>) : ''} as="span" />
      </Link>
    </Box>
  );
};

export default BarButton;
