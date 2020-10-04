import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button, Box, Heading, Grid,
} from 'grommet';
import Logout from 'Containers/Logout';
import { useSelector } from 'react-redux';
import CreateOrder from 'Components/Modals/CreateOrder';

const AppBar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const userInfo = useSelector((state) => state.logUser.data);

  useEffect(() => {
    if (userInfo) setIsLogged(true);
    else setIsLogged(false);
  }, [userInfo]);

  return (
    <Grid rows={['full']} columns={['1/3', '1/3', '1/3']} fill>
      <Box align="start">

      </Box>
      <Box justify="center" align="center">
        <Heading level="3" margin="none">
          HomeCourier
        </Heading>
      </Box>
      <Box align="end" pad="xsmall">
        {barButton(isLogged, userInfo.documentNumber)}
      </Box>
    </Grid>
  );
};

const barButton = (loggedin, volunteer) => {
  const location = useLocation();
  if (loggedin && !volunteer) {
    return (
      <Box direction="row-responsive" gap="medium" justify="end">
        <CreateOrder /> <Logout />
      </Box>
    );
  }
  if (loggedin) {
    return (
      <Box direction="row-responsive" gap="medium" justify="end">
        <Logout />
      </Box>
    );
  }
  if (!loggedin && location.pathname === '/login') {
    return <Box />;
  }
  return (
    <Box direction="row" gap="xsmall">
      <Link to="/login">
        <Button primary label="Login" />
      </Link>
    </Box>
  );
};

export default AppBar;
