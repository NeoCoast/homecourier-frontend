import React, { useState } from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import { useSelector } from 'react-redux';
import RateOrder from 'Containers/RateOrder';

const Profile = () => {
  const userInfo = useSelector((state) => state.logUser.data);
  const [unrated, setUnrated] = useState(true);

  return (
    <Box fill align="center">
      <Box>
        <Heading>Bienvenido {userInfo.username}</Heading>
        <RateOrder orderId={4} show={unrated} setShow={setUnrated} />
      </Box>
    </Box>
  );
};

export default Profile;
