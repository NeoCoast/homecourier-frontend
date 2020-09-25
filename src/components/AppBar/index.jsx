import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, Button, Box, Heading, Grid,
} from 'grommet';

import Hamburger from 'Assets/hamburger.svg';

const AppBar = () => {
  const loggedin = false;
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
        {leftElement(loggedin)}
      </Box>
    </Grid>
  );
};

const leftElement = (loggedin) => {
  const location = useLocation();
  if (loggedin) {
    return <Menu label="account" items={[{ label: 'logout' }]} />;
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
