import React, { useEffect, useState } from 'react';
import './index.scss';
import { Box, Heading } from 'grommet';
import { useSelector } from 'react-redux';
import ExactLocation from 'Components/MapsExactLocation';
import PropTypes from 'prop-types';
import usersService from 'Api/users.service';
import { useHistory } from 'react-router-dom';

const Profile = (props) => {
  const userInfo = useSelector((state) => state.logUser.data);
  let { match: { params: { username } } } = props;
  const history = useHistory();
  username = username || userInfo.username;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getUserData() {
      if (username !== userInfo.username) {
        try {
          const response = await usersService.profileData(username);
          setUserData(response.data);
        } catch (error) {
          history.push('/404');
        }
      } else {
        setUserData(userInfo);
      }
    }
    getUserData();
  }, []);

  return (
    <Box fill align="center">
      <Box overflow="auto" justify="stretch">
        <Heading alignSelf="stretch">Perfil de {username}</Heading>
        {userData.username === userInfo.username && (
          <Box margin="small" overflow="auto">
            <ExactLocation isMarkerShown lat={userData.latitude} lng={userData.longitude} zoom={16} size={300} />
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
