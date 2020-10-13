import React, { useState } from 'react';
import {
  Box, Button, Heading, Image, Nav,
} from 'grommet';
import { useSelector } from 'react-redux';
import { Menu } from 'grommet-icons';
import Logo from 'Assets/homecourier_logo.png';
import BarButton from 'Components/BarButton';
import ProfileDropdown from 'Components/ProfileDropdown';
import SideMenu from 'Components/SideMenu';

const AppBar = () => {
  const loggedIn = useSelector((state) => state.logUser.loggedIn);
  const [sideMenu, setSideMenu] = useState(false);

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
          HomeCourier
        </Heading>
      </Box>
      {!loggedIn && <BarButton />}
      {loggedIn && <ProfileDropdown />}
      {sideMenu && <SideMenu onClose={onClose} />}
    </Nav>
  );
};

export default AppBar;
