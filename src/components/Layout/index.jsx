import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Header, Grommet, Main, Grid,
} from 'grommet';
import theme from 'Theme/theme';
import CustomToast from 'Components/CustomToast';
import Background from 'Assets/background.svg';
import AppBar from 'Components/AppBar';
import { useSelector } from 'react-redux';
import RateOrder from 'Containers/RateOrder';

const Layout = ({ children }) => {
  const userInfo = useSelector((state) => state.logUser);
  const [rate, setRate] = useState(false);

  useEffect(() => {
    setRate((userInfo.data) && (userInfo.data.pendings.length !== 0));
  }, [userInfo]);

  return (
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
          {rate && (
            <RateOrder
              username={userInfo.data.pendings[0].user_name}
              orderId={userInfo.data.pendings[0].order_id}
              setShow={setRate}
              show={rate}
            />
          )}
        </Main>
      </Grid>
    </Grommet>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
