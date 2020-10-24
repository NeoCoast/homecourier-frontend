import {
  Box, Stack, Text, Drop, List, Heading, Anchor,
} from 'grommet';
import { Notification } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import notificationsService from 'Api/notifications.service';
import { RingLoader } from 'react-spinners';
import { loadAll } from 'Actions/userNotifications';
import NotificationComponent from './Notification';

const NotificationMenu = () => {
  const dispatch = useDispatch();
  const notis = useSelector((state) => state.userNotifications.notifications);
  const notiRef = useRef();
  const [openDrop, setOpenDrop] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const notSeenNotifications = notis.filter((x) => x.status === 'not_seen');
  const seenNotifications = notis.filter((x) => x.status === 'seen');

  const getNotifications = async (page = 0) => {
    const res = await notificationsService.getNotifications(page);
    const notisId = notis.map((x) => x.id);
    const resWithoutNew = res.data.notifications.filter((x) => !notisId.includes(x.id));
    setNotificationHistory([...notificationHistory, ...resWithoutNew]);
    setLoading(false);
  };

  const openHistory = async () => {
    setLoading(true);
    await getNotifications();
    setViewHistory(true);
  };

  const closeHistory = async () => {
    setPageNumber(1);
    setViewHistory(false);
    setNotificationHistory([]);
  };

  const setSeen = async () => {
    const notifications = JSON.parse(JSON.stringify(notis));
    const seenNotis = [...notifications.filter((x) => x.status === 'not_seen')];
    const seenNotisId = seenNotis.map((x) => x.id);
    notifications.map((x) => {
      const item = x;
      item.status = 'seen';
      return item;
    });
    try {
      const response = await notificationsService.setSeenNotifications(seenNotisId);
      if (response.status === 200) await dispatch(loadAll(notifications));
    } catch (error) {
      console.error(error);
    }
  };

  const openNotiDrop = () => {
    setOpenDrop(true);
  };

  const closeNotiDrop = () => {
    setOpenDrop(false);
    setSeen();
  };

  return (
    <Box pad="small" justify="center">

      <Stack anchor="top-right" fill onClick={openNotiDrop} style={{ cursor: 'pointer' }} id="noty-stack">
        <Notification size="30" />
        { notSeenNotifications.length > 0
          && (
            <Box
              background="brand"
              pad={{ horizontal: 'xsmall' }}
              round
            >
              <Text size="xsmall">{notis.filter((x) => x.status === 'not_seen').length}</Text>
            </Box>
          )}
      </Stack>
      <Box ref={notiRef}></Box>

      {openDrop && (
        <Drop
          align={{ top: 'bottom', right: 'left' }}
          target={notiRef.current}
          onEsc={closeNotiDrop}
          onClickOutside={closeNotiDrop}
        >
          <Box pad="small" style={{ minWidth: '300px' }}>
            <Heading level="4" margin="none">Notificaciones</Heading>
            {notSeenNotifications.length === 0 && seenNotifications.length === 0
              && <Text size="small">No hay notificaciones para mostrar.</Text>}
            {notSeenNotifications.length > 0
            && (
              <List
                data={notSeenNotifications}
              >
                {NotificationComponent}
              </List>
            )}
            {seenNotifications.length > 0
            && (
              <List
                data={seenNotifications}
              >
                {NotificationComponent}
              </List>
            )}
            {!viewHistory && !loading && <Anchor onClick={() => openHistory()}>Ver todas</Anchor>}
            { loading && <Box fill="horizontal" justify="center" align="center"><RingLoader loading size={80} color="#54a3ff" /></Box>}
            { viewHistory
            && (
              <Box fill="horizontal" margin={{ bottom: 'small' }} pad={{ top: 'small' }}>
                <Box direction="row" justify="between">
                  <Heading level="5" margin="none">Historico</Heading>
                  <Anchor onClick={closeHistory}>Esconder</Anchor>
                </Box>
                <Box fill="horizontal" overflow="auto" height="50vh">
                  <List
                    data={notificationHistory}
                    onMore={() => {
                      getNotifications(pageNumber);
                      setPageNumber(pageNumber + 1);
                    }}
                  >
                    {NotificationComponent}
                  </List>
                </Box>
              </Box>
            )}
          </Box>
        </Drop>
      )}

    </Box>
  );
};

export default NotificationMenu;
