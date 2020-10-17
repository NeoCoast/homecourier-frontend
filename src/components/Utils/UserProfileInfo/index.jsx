import { Avatar, Box, Text } from 'grommet';
import React from 'react';
import PropTypes from 'prop-types';
import CalificationGradient from 'Components/Utils/CalificationGradient';

const UserProfileInfo = ({ user }) => (
  <Box direction="row" gap="small" fill="horizontal">
    <Avatar src={`https://robohash.org/${user.username}`} border="all" />

    <Box
      style={{
        flex: '1 1 0',
      }}
    >
      <Text>{`${user.name.toUpperCase()} ${user.lastname.toUpperCase()}`}</Text>
      <CalificationGradient
        percent={75}
      />
    </Box>
  </Box>
);

UserProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfileInfo;
