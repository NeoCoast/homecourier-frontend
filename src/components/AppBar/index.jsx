import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button, Box, Heading, Grid,
} from 'grommet';

import Hamburger from 'Assets/hamburger.svg';
import PropTypes from 'prop-types';
import LogoutContainer from '../../containers/Redux/Logout';

const AppBar = (props) => {
  const [isLogged, setLogged] = useState(false);
  useEffect(() => {
    if (props.data) setLogged(true);
    else setLogged(false);
  });
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
        {leftElement(isLogged)}
      </Box>
    </Grid>
  );
};

const leftElement = (loggedin) => {
  const location = useLocation();
  if (loggedin) {
    return <LogoutContainer />;
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

AppBar.propTypes = {
  data: PropTypes.object,
};

AppBar.defaultProps = {
  data: undefined,
};

export default AppBar;
