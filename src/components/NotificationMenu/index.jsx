import {
  Box, Stack, Text, Drop, Heading,
} from 'grommet';
import { Notification } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState, useEffect } from 'react';
import notificationsService from 'Api/notifications.service';
import { RingLoader } from 'react-spinners';
import { loadAll } from 'Actions/userNotifications';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';
import NotificationComponent from './Notification';

const NotificationMenu = () => {
  const dispatch = useDispatch();
  const allNotificationsSelector = useSelector((state) => state.userNotifications.notifications);
  const [notifications, setNotifications] = useState(allNotificationsSelector);
  const [notSeenNotifications, setNotSeenNotifications] = useState([]);
  const notiRef = useRef();
  const [openDrop, setOpenDrop] = useState(false);
  const [loading, setLoading] = useState(false);

  const renderNotification = ({ index, style }) => notifications[index]
    ? <div style={style}>{NotificationComponent(notifications[index])}</div>
    : false;

  const loadMoreItems = async (startIndex, stopIndex) => {
    if (notifications.length && notifications.length > stopIndex + 1) {
      console.log(startIndex, stopIndex);
      return;
    }
    const page = Math.floor((stopIndex + 1) / 50);
    const res = await notificationsService.getNotifications(page);
    setNotifications([...notifications, ...res.data.notifications]
      .filter((notif, index, a) => a.findIndex((t) => (t.id === notif.id)) === index));
    setLoading(false);
    console.log(notifications);
  };

  const isItemLoaded = ({ index }) => !!notifications[index];

  useEffect(() => {
    setNotSeenNotifications(notifications.filter((notif) => notif.status === 'not_seen'));
  }, [notifications]);

  useEffect(() => {
    setNotifications(allNotificationsSelector);
  }, [allNotificationsSelector]);

  const setSeen = async () => {
    const seenNotisId = notifications.filter((notif) => notif.status === 'seen').map((x) => x.id);
    try {
      const response = await notificationsService.setSeenNotifications(seenNotisId);
      setNotifications(
        notifications.map((noti) => {
          const notiAux = noti;
          notiAux.status = 'seen';
          return notiAux;
        })
      );
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
            {loading && <Box fill="horizontal" justify="center" align="center"><RingLoader loading size={80} color="#54a3ff" /></Box>}
            <Box fill="horizontal" margin={{ bottom: 'small' }} pad={{ top: 'small' }}>
              <Box fill="horizontal" overflow="auto" height="40vh">
                <InfiniteLoader
                  isItemLoaded={isItemLoaded}
                  itemCount={notifications.length || 50}
                  loadMoreItems={loadMoreItems}
                >
                  {({ onItemsRendered, ref }) => (
                    <FixedSizeList
                      height={300}
                      width={320}
                      itemCount={notifications.length || 50}
                      itemSize={72}
                      onItemsRendered={onItemsRendered}
                      ref={ref}
                    >
                      {renderNotification}
                    </FixedSizeList>
                  )}
                </InfiniteLoader>
              </Box>
            </Box>
          </Box>
        </Drop>
      )}
    </Box>
  );
};

export default NotificationMenu;
