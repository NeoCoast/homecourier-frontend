import {
  Box, Stack, Text, Drop, List, Heading, Anchor,
} from 'grommet';
import { Notification } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState, useEffect } from 'react';
import notificationsService from 'Api/notifications.service';
import { RingLoader } from 'react-spinners';
import { loadAll } from 'Actions/userNotifications';
import NotificationComponent from './Notification';

const NotificationMenu = () => {
  const dispatch = useDispatch();
  const allNotificationsSelector = useSelector((state) => state.userNotifications.notifications);
  const [allNotifications, setAllNotifications] = useState(allNotificationsSelector);
  const [notSeenNotifications, setNotSeenNotifications] = useState(allNotifications.filter((x) => x.status === 'not_seen'));
  const [seenNotifications, setSeenNotifications] = useState(allNotifications.filter((x) => x.status === 'seen'));
  const notiRef = useRef();
  const [openDrop, setOpenDrop] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [notSeenPage, setNotSeenPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const getNotifications = async (page = 0) => {
    const res = await notificationsService.getNotifications(page);
    setNotificationHistory([...notificationHistory, ...res.data.notifications]);
    setLoading(false);
  };

  const getNotSeenNotifications = async (page = 0) => {
    const res = await notificationsService.getNotSeenNotifications(page);
    if (!(res.data.notifications.length === 0)) {
      setAllNotifications(allNotifications.concat(res.data.notifications)
        .filter((notif, index, a) => a.findIndex((t) => (t.id === notif.id)) === index));
    }
  };

  useEffect(() => {
    getNotSeenNotifications(notSeenPage);
  }, [notSeenPage]);

  useEffect(() => {
    if (notSeenNotifications.length === 0) {
      setNotSeenPage(0);
    }
  }, [notSeenNotifications]);

  useEffect(() => {
    setAllNotifications(allNotificationsSelector);
  }, [allNotificationsSelector]);

  useEffect(() => {
    setNotSeenNotifications(allNotifications.filter((x) => x.status === 'not_seen'));
  }, [allNotifications]);

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
    const seenNotisId = notSeenNotifications.map((x) => x.id);
    try {
      const response = await notificationsService.setSeenNotifications(seenNotisId);
      notSeenNotifications.forEach((noti) => {
        const notiAux = noti;
        notiAux.status = 'seen';
      });
      setNotSeenNotifications(allNotifications.filter((x) => x.status === 'not_seen'));
      setSeenNotifications(allNotifications.filter((x) => x.status === 'seen'));
      if (response.status === 200) await dispatch(loadAll(allNotifications));
      setNotSeenPage(0);
      getNotSeenNotifications();
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
        {notSeenNotifications.length > 0
          && (
            <Box
              background="brand"
              pad={{ horizontal: 'xsmall' }}
              round
            >
              <Text size="xsmall">{notSeenNotifications.length >= 50 ? '50+' : notSeenNotifications.length}</Text>
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
              && <Text size="small">No hay notificaciones nuevas para mostrar.</Text>}
            <Box fill="horizontal" overflow="auto" style={{ maxHeight: '45vh' }}>
              {notSeenNotifications.length > 0
                && (
                  <List
                    data={notSeenNotifications}
                    onMore={async () => {
                      setNotSeenPage(notSeenPage + 1);
                    }}
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
            </Box>
            {!viewHistory && !loading && <Anchor onClick={() => openHistory()}>Ver todas</Anchor>}
            {loading && <Box fill="horizontal" justify="center" align="center"><RingLoader loading size={80} color="#54a3ff" /></Box>}
            {viewHistory
              && (
                <Box fill="horizontal" margin={{ bottom: 'small' }} pad={{ top: 'small' }}>
                  <Box direction="row" justify="between">
                    <Heading level="5" margin="none">Histórico</Heading>
                    <Anchor onClick={closeHistory}>Esconder</Anchor>
                  </Box>
                  <Box fill="horizontal" overflow="auto" height="45vh">
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
