import React, { useEffect } from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import { useSelector } from 'react-redux';
import ExactLocation from 'Components/MapsExactLocation';

const Profile = () => {
  const userInfo = useSelector((state) => state.logUser.data);
  useEffect(() => {
    console.log(userInfo);
  });
  return (
    <Box fill align="center">
      <Box overflow="auto" justify="stretch">
        <Heading alignSelf="stretch">Perfil de {userInfo.username}</Heading>
        <Box margin="small" overflow="auto">
          <ExactLocation isMarkerShown lat={userInfo.latitude} lng={userInfo.longitude} zoom={16} size={300} />
        </Box>
      </Box>
    </Box>
  );
};
export default Profile;
