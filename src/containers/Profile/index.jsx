import React, { useState, useEffect } from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import { useSelector } from 'react-redux';
import RateOrder from 'Containers/RateOrder';

const Profile = () => {
  const userInfo = useSelector((state) => state.logUser.data);
  const [rate, setRate] = useState(false);

  useEffect(() => {
    if (userInfo.pendingRate) {
      setRate(true);
    } else {
      setRate(false);
    }
  }, [userInfo]);

  return (
    <Box fill align="center">
      <Box>
        <Heading>Bienvenido {userInfo.username}</Heading>
      </Box>
      <RateOrder orderId={userInfo.pendingRateId} setShow={setRate} show={rate} />
    </Box>
  );
};

export default Profile;
