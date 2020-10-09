import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Anchor } from 'grommet';
import { Login, Home } from 'grommet-icons';
import { ROUTES } from 'Data/constants';

const BarButton = () => {
  const location = useLocation();

  const [onHover, setOnHover] = useState(false);
  const [onHover2, setOnHover2] = useState(false);

  useEffect(() => {
    if (location.pathname === ROUTES.home) {
      setOnHover2(true);
    }
    if (location.pathname === ROUTES.login) {
      setOnHover(true);
    }
  }, [onHover, onHover2]);

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
        onMouseEnter={() => expandItem(setOnHover2)}
        onMouseLeave={() => location.pathname !== ROUTES.home ? contractItem(setOnHover2) : null}
        onClick={() => contractItem(setOnHover)}
      >
        <Anchor icon={<Home />} label={onHover2 ? (<Box animation="slideRight">Inicio</Box>) : ''} />
      </Link>
      <Link
        to="/login"
        onMouseEnter={() => expandItem(setOnHover)}
        onMouseLeave={() => location.pathname === ROUTES.login ? null
          : contractItem(setOnHover)}
        onClick={() => contractItem(setOnHover2)}
      >
        <Anchor icon={<Login />} label={onHover ? (<Box animation="slideRight">Iniciar sesión</Box>) : ''} />
      </Link>
    </Box>
  );
};

export default BarButton;
