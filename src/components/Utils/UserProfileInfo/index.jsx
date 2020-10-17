import { Avatar, Box, Text } from 'grommet';
import React from 'react';
import PropTypes from 'prop-types';

const UserProfileInfo = ({ user }) => (
  <Box direction="row" gap="small" fill="horizontal">
    <Avatar src={`https://robohash.org/${user.username}`} border="all" />

    <Box>
      <Text>{`${user.name.toUpperCase()} ${user.lastname.toUpperCase()}`}</Text>
    </Box>
  </Box>
);

UserProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfileInfo;
