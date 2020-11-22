import { Avatar, Box, Text } from 'grommet';
import React from 'react';
import PropTypes from 'prop-types';
import CalificationGradient from 'Components/Utils/CalificationGradient';
import ProfilePicture from 'Assets/profile-picture.png';
import { useHistory } from 'react-router-dom';

const UserProfileInfo = ({ user }) => {
  const history = useHistory();
  return (
    <Box
      direction="row"
      gap="small"
      fill="horizontal"
      onClick={() => history.push(`/profile/${user.username}`)}
    >
      <Avatar src={user.avatar ? `${process.env.API_URL}${user.avatar}` : ProfilePicture} border="all" />

      <Box
        style={{
          flex: '1 1 0',
        }}
      >
        <Box onClick={() => history.push(`/profile/${user.username}`)}>
          <Text truncate style={{ maxWidth: '200px' }}>{`${user.name.toUpperCase()} ${user.lastname.toUpperCase()}`}</Text>
        </Box>
        {(user.rating)
          ? (
            <CalificationGradient
              percent={user.rating !== null ? ((Number(user.rating) * 100) / 5) : 0}
              maxRating={5}
            />
          ) : (
            <Text size="small"> No tiene calificaciones. </Text>
          )}
      </Box>
    </Box>
  );
};

UserProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfileInfo;
