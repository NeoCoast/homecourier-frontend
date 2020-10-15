import React, { useState } from 'react';
import {
  Box, Button, Heading, Image, Nav, Text,
} from 'grommet';
import { useSelector } from 'react-redux';
import { Menu } from 'grommet-icons';
import Logo from 'Assets/homecourier_logo.png';
import BarButton from 'Components/BarButton';
import ProfileDropdown from 'Components/ProfileDropdown';
import SideMenu from 'Components/SideMenu';
import NotificationMenu from 'Components/NotificationMenu';

const AppBar = () => {
  const loggedIn = useSelector((state) => state.logUser.loggedIn);
  const notis = useSelector((state) => state.userNotifications.notifications);
  const [sideMenu, setSideMenu] = useState(false);

  const hola = () =>{ console.log('i am notis', notis); return [...notis];}

  const onClose = () => setSideMenu(false);
  return (
    <Nav direction="row" fill gap="none">
      <Box align="center" justify="center" pad="small">
        {loggedIn && <Button icon={<Menu />} size="large" onClick={() => setSideMenu(true)} />}
      </Box>
      <Box direction="row" justify="start" align="center" fill>
        <Box width="48px" height="48px" margin={{ horizontal: 'small', vertical: 'none' }}>
          <Image src={Logo} fit="contain" />
        </Box>
        <Heading level="3" margin={{ horizontal: 'small', vertical: 'none' }}>
          HomeCourier {console.log('rerendering', notis)}
        </Heading>
      </Box>
      {!loggedIn && <BarButton />}
      <Box fill direction="row" alignSelf="end" justify="end" align="center">
        {loggedIn && <NotificationMenu />}
        {loggedIn && <ProfileDropdown />}
      </Box>
      {sideMenu && <SideMenu onClose={onClose} />}
    </Nav>
  );
};

export default AppBar;
