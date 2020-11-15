import {
  Box, Stack, Text, Drop, Heading,
} from 'grommet';
import { Notification } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState, useEffect } from 'react';
import notificationsService from 'Api/notifications.service';
import { RingLoader } from 'react-spinners';
import { loadAll } from 'Actions/userNotifications';
import {
  InfiniteLoader,
  CellMeasurer,
  CellMeasurerCache,
  List,
  AutoSizer,
} from 'react-virtualized';
import NotificationComponent from './Notification';

const NotificationMenu = () => {
  const dispatch = useDispatch();
  const allNotificationsSelector = useSelector((state) => state.userNotifications.notifications);
  const [notifications, setNotifications] = useState(allNotificationsSelector);
  const [notSeenNotifications, setNotSeenNotifications] = useState([]);
  const notiRef = useRef();
  const [openDrop, setOpenDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const listRef = useRef();
  const [updateListIndex, setUpdateListIndex] = useState(-1);
  const [updateList, setUpdateList] = useState(false);

  const loadMoreItems = async ({ stopIndex }) => {
    if (notifications.length && notifications.length > stopIndex + 1) {
      return;
    }
    const page = Math.floor((stopIndex + 1) / 50);
    const res = await notificationsService.getNotifications(page);
    setNotifications([...notifications, ...res.data.notifications]
      .filter((notif, index, a) => a.findIndex((t) => (t.id === notif.id)) === index));
    setLoading(false);
  };

  const isItemLoaded = ({ index }) => !!notifications[index];

  useEffect(() => {
    setNotSeenNotifications(notifications.filter((notif) => notif.status === 'not_seen'));
  }, [notifications]);

  useEffect(() => {
    setNotifications(allNotificationsSelector);
  }, [allNotificationsSelector]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.recomputeRowHeights(updateListIndex);
      listRef.current.forceUpdateGrid();
    }
  }, [updateList, updateListIndex]);

  const setSeen = async () => {
    const seenNotisId = notifications.filter((notif) => notif.status === 'seen').map((x) => x.id);
    try {
      const response = await notificationsService.setSeenNotifications(seenNotisId);
      const notificationsAux = notifications.map((noti) => {
        const notiAux = noti;
        notiAux.status = 'seen';
        return notiAux;
      });
      setNotifications(notificationsAux);
      if (response.status === 200) await dispatch(loadAll(notifications));
    } catch (error) {
      console.error(error);
    }
  };

  const openNotiDrop = () => {
    setOpenDrop(true);
  };

  const closeNotiDrop = async () => {
    setNotSeenNotifications([]);
    setOpenDrop(false);
    await setSeen();
    loadMoreItems({ stopIndex: notifications.length });
  };

  const cache = new CellMeasurerCache({
    defaultHeight: 72,
    fixedWidth: true,
  });

  const rowRenderer = ({
    index,
    key,
    parent,
    style,
  }) => (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      parent={parent}
      rowIndex={index}
    >
      {({ measure, registerChild }) => (
        notifications[index]
          ? (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
              style={style}
              ref={registerChild}
              onClick={() => {
                measure();
                setUpdateList(!updateList);
                setUpdateListIndex(index);
              }}
            >
              {NotificationComponent(notifications[index])}
            </div>
          )
          : false
      )}
    </CellMeasurer>
  );

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
          responsive={false}
          stretch={false}
        >
          <Box pad="small">
            <Heading level="4" margin="none">Notificaciones</Heading>
            {loading && <Box fill="horizontal" justify="center" align="center"><RingLoader loading size={80} color="#54a3ff" /></Box>}
            {notifications.length ? (
              <Box width="340px" height="40vh">
                <InfiniteLoader
                  isRowLoaded={isItemLoaded}
                  rowCount={notifications.length + 1 || 51}
                  loadMoreRows={loadMoreItems}
                >
                  {({ onRowsRendered }) => (
                    <AutoSizer>
                      {({ height, width }) => (
                        <List
                          height={height}
                          width={width}
                          onRowsRendered={onRowsRendered}
                          ref={listRef}
                          rowCount={notifications.length || 50}
                          rowRenderer={rowRenderer}
                          deferredMeasurementCache={cache}
                          rowHeight={cache.rowHeight}
                        />
                      )}
                    </AutoSizer>
                  )}
                </InfiniteLoader>
              </Box>
            ) : (
              <Box fill="horizontal" width="300px" height="5vh">
                <Text size="small">No hay notificaciones</Text>
              </Box>
            )}
          </Box>
        </Drop>
      )}
    </Box>
  );
};

export default NotificationMenu;
