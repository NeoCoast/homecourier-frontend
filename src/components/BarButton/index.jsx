import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button, Box,
} from 'grommet';
import { useSelector } from 'react-redux';
import Logout from 'Containers/Logout';
import CreateOrder from '../Modals/CreateOrder';

const BarButton = () => {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const userInfo = useSelector((state) => state.logUser.data);

  useEffect(() => {
    if (userInfo) setIsLogged(true);
    else setIsLogged(false);
  }, [userInfo]);

  return (
    <Box direction="row-responsive" gap="medium" justify="end">
      { isLogged && !userInfo.documentNumber
      && <CreateOrder />}
      { isLogged
      && <Logout />}
      { !isLogged && location.pathname !== '/login'
      && (
        <Link to="/login">
          <Button primary label="Ingresar" />
        </Link>
      )}
    </Box>
  );
};

export default BarButton;
