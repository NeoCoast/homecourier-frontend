import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button, Box, Heading, Grid,
} from 'grommet';

import Hamburger from 'Assets/hamburger.svg';
import Logout from 'Containers/Logout';
import { useSelector } from 'react-redux';
import CreateOrder from '../Modals/CreateOrder';

const AppBar = () => {
  const [isLogged, setLogged] = useState(false);
  const userInfo = useSelector((state) => state.logUser.data);

  useEffect(() => {
    if (userInfo) setLogged(true);
    else setLogged(false);
  }, [userInfo]);

  return (
    <Grid rows={['full']} columns={['1/3', '1/3', '1/3']} fill>
      <Box align="start">
        <Button icon={<img src={Hamburger} alt="hamburger" />} hoverIndicator />
      </Box>
      <Box justify="center" align="center">
        <Heading level="3" margin="none">
          HomeCourier
        </Heading>
      </Box>
      <Box align="end" pad="xsmall">
        {barButton(isLogged)}
      </Box>
    </Grid>
  );
};

const barButton = (loggedin) => {
  const location = useLocation();
  if (loggedin) {
    return <Box direction="row-responsive" gap="medium" justify="end"> <CreateOrder /> <Logout /> </Box>;
  }
  if (!loggedin && location.pathname === '/login') {
    return <Box />;
  }
  return (
    <Box direction="row" gap="xsmall">
      <Link to="/login">
        <Button primary label="Login" />
      </Link>
      <Link to="/register">
        <Button secondary label="Registrarse" />
      </Link>
    </Box>
  );
};

export default AppBar;
