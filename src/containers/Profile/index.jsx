import React from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import { useSelector } from 'react-redux';
import ExactLocation from 'Components/MapsExactLocation';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const userInfo = useSelector((state) => state.logUser.data);
  let { match: { params: { username } } } = props;
  username = username || userInfo.username;
  return (
    <Box fill align="center">
      <Box overflow="auto" justify="stretch">
        <Heading alignSelf="stretch">Perfil de {username}</Heading>
        {username === userInfo.username && (
          <Box margin="small" overflow="auto">
            <ExactLocation isMarkerShown lat={userInfo.latitude} lng={userInfo.longitude} zoom={16} size={300} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
};

Profile.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: '',
    }),
  }),
};

export default Profile;
