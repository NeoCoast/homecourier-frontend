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
  const [isLogged, setIsLogged] = useState(false);
  const userInfo = useSelector((state) => state.logUser.data);

  useEffect(() => {
    if (userInfo) setIsLogged(true);
    else setIsLogged(false);
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
        {barButton(isLogged, userInfo)}
      </Box>
    </Grid>
  );
};

const barButton = (loggedin, userInfo) => {
  const location = useLocation();
  if (loggedin) {
    if (!userInfo.documentNumber) {
      return <Box direction="row-responsive" gap="medium" justify="end"> <CreateOrder /> <Logout /> </Box>;
    }
    return <Box direction="row-responsive" gap="medium" justify="end"> <Logout /> </Box>;
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
