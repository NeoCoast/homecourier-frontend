import React, { useContext, useState } from 'react';
import {
  Box, Button, Heading, Image, Nav, ResponsiveContext,
} from 'grommet';
import { useSelector } from 'react-redux';
import { Menu } from 'grommet-icons';
import Logo from 'Assets/homecourier_logo.webp';
import BarButton from 'Components/BarButton';
import ProfileDropdown from 'Components/ProfileDropdown';
import SideMenu from 'Components/SideMenu';
import NotificationMenu from 'Components/NotificationMenu';

const AppBar = () => {
  const loggedIn = useSelector((state) => state.logUser.loggedIn);
  const [sideMenu, setSideMenu] = useState(false);
  const viewPortSize = useContext(ResponsiveContext);

  const onClose = () => setSideMenu(false);
  return (
    <Nav direction="row" fill gap="none">
      <Box align="center" justify="center" pad="small">
        {loggedIn && <Button icon={<Menu />} size="large" onClick={() => setSideMenu(true)} />}
      </Box>
      <Box direction="row" justify="start" align="center" fill>
        <Box width="48px" height="48px" margin={{ horizontal: 'small', vertical: 'none' }}>
          <Image src={Logo} fit="contain" width={viewPortSize === 'small' ? '24px' : '48px'} height={viewPortSize === 'small' ? '24px' : '48px'} alt="Logo" />
        </Box>
        <Heading level="3" margin={{ horizontal: 'small', vertical: 'none' }}>
          HomeCourier
        </Heading>
      </Box>
      {!loggedIn && <BarButton />}
      {loggedIn
      && (
        <Box fill direction="row" alignSelf="end" justify="end" align="center">
          <NotificationMenu />
          <ProfileDropdown />
        </Box>
      )}
      {sideMenu && <SideMenu onClose={onClose} />}
    </Nav>
  );
};

export default AppBar;
