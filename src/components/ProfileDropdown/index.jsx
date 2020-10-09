import {
  Box, Avatar, Drop, Anchor,
} from 'grommet';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Logout, User } from 'grommet-icons';
import { ROUTES } from 'Data/constants';
import usersService from 'Api/users.service';
import { logout } from 'Actions/logUser';
import { useDispatch } from 'react-redux';
import Spinner from 'Components/Utils/Spinner';

const ProfileDropdown = () => {
  const avatarRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const [openDrop, setOpenDrop] = useState(false);
  const [loading, setLoading] = useState(false);

  const switchDrop = () => {
    setOpenDrop(!openDrop);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await usersService.logout(); // Sends an HTTP.delete to the API
      await dispatch(logout()); // Dispatches Redux's action
      setLoading(false);
      history.push(ROUTES.login); // Redirects to Login page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box fill justify="center" align="end" pad="small">
      <Box ref={avatarRef}>
        <Avatar src="https://robohash.org/miraak98" onClick={switchDrop} border="all" />
      </Box>

      {openDrop && (
        <Drop
          align={{ top: 'bottom' }}
          target={avatarRef.current}
          onEsc={switchDrop}
          onClickOutside={switchDrop}
        >
          <Box pad="small" style={{ minWidth: '160px' }}>
            <Anchor label="Mi Perfil" icon={<User />} onClick={() => history.push(ROUTES.profile)} />
            <Anchor label="Cerrar Sesión" icon={<Logout />} onClick={handleLogout} />
          </Box>
        </Drop>
      )}
      {loading && <Spinner />}
    </Box>
  );
};
export default ProfileDropdown;