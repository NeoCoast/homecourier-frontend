import {
  Box, Avatar, Drop, Anchor,
} from 'grommet';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Logout, User } from 'grommet-icons';
import { ROUTES } from 'Data/constants';
import usersService from 'Api/users.service';
import { logout } from 'Actions/logUser';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Utils/Spinner';
import AddImage from 'Assets/add-image.svg';

const ProfileDropdown = () => {
  const avatarRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const [openDrop, setOpenDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.logUser.data);

  const switchDrop = () => {
    setOpenDrop(!openDrop);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await usersService.logout(); // Sends an HTTP.delete to the API
      await dispatch(logout()); // Dispatches Redux's action
      history.push(ROUTES.login); // Redirects to Login page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box justify="center" align="end" pad="small">
      <Box ref={avatarRef}>
        <Avatar src={userData.avatar ? userData.avatar : AddImage} onClick={switchDrop} border="all" />
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
