import { Avatar, Box, Text } from 'grommet';
import React from 'react';
import PropTypes from 'prop-types';
import CalificationGradient from 'Components/Utils/CalificationGradient';
import ProfilePicture from 'Assets/profile-picture.png';

const UserProfileInfo = ({ user }) => (
  <Box direction="row" gap="small" fill="horizontal">
    <Avatar src={user.avatar ? `${process.env.API_URL}${user.avatar}` : ProfilePicture} border="all" />

    <Box
      style={{
        flex: '1 1 0',
      }}
    >
      <Text>{`${user.name.toUpperCase()} ${user.lastname.toUpperCase()}`}</Text>
      <CalificationGradient
        percent={user.rating !== null ? ((Number(user.rating) * 100) / 5) : 0}
        maxRating={5}
      />
    </Box>
  </Box>
);

UserProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfileInfo;
