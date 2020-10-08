import React from 'react';
import {
  Box, Heading, Grid,
} from 'grommet';
import BarButton from '../BarButton';

const AppBar = () => (
  <Grid rows={['full']} columns={['1/3', '1/3', '1/3']} fill>
    <Box align="start">

    </Box>
    <Box justify="center" align="center">
      <Heading level="3" margin="none">
        HomeCourier
      </Heading>
    </Box>
    <Box align="end" pad="xsmall">
      <BarButton />

    </Box>
  </Grid>
);

export default AppBar;
