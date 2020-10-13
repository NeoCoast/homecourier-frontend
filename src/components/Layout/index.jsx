import React from 'react';
import PropTypes from 'prop-types';
import {
  Header, Grommet, Main, Grid,
} from 'grommet';
import theme from 'Theme/theme';
import CustomToast from 'Components/CustomToast';

import Background from 'Assets/background.svg';

import AppBar from 'Components/AppBar';

const Layout = ({ children }) => (
  <Grommet theme={theme} full>
    <Grid
      rows={['72px', 'flex']}
      columns={['flex']}
      fill="vertical"
      areas={[
        { name: 'header', start: [0, 0], end: [0, 0] },

        { name: 'main', start: [0, 1], end: [0, 1] },
      ]}
    >
      <Header background="white" gridArea="header" elevation="small" gap="none">
        <AppBar />
        <CustomToast />
      </Header>
      <Main gridArea="main" background={`url(${Background})`}>
        {children}
      </Main>
    </Grid>
  </Grommet>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
