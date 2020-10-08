import React from 'react';
import {
  Box, Heading, Image,
} from 'grommet';
import Logo from 'Assets/homecourier_logo.png';
import BarButton from '../BarButton';

const AppBar = () => (
  <Box direction="row" fill>
    <Box align="start">

    </Box>
    <Box direction="row" justify="start" align="center" fill>
      <Box width="48px" height="48px" margin={{ horizontal: 'small', vertical: 'none' }}>
        <Image src={Logo} fit="contain" />
      </Box>
      <Heading level="3" margin={{ horizontal: 'small', vertical: 'none' }}>
        HomeCourier
      </Heading>
    </Box>
    <Box alignSelf="end" align="end" pad="xsmall" fill>
      <BarButton />
    </Box>
  </Box>
);

export default AppBar;
