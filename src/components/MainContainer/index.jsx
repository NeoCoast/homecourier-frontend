import React, { useEffect } from 'react';
import Layout from 'Components/Layout';
import { ActionCableConsumer, ActionCableProvider } from 'react-actioncable-provider';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import notificationsService from 'Api/notifications.service';
import { add, loadAll } from 'Actions/userNotifications';

const MainContainer = ({ children }) => {
  const loggedIn = useSelector((state) => state.logUser.loggedIn);
  const userData = useSelector((state) => state.logUser.data);
  const dispatch = useDispatch();

  const loadNotifications = async () => {
    try {
      const noti = await notificationsService.getNotifications();
      await dispatch(loadAll(noti.data.notifications.filter((x) => x.status === 'not_seen')));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedIn) loadNotifications();
  }, [loggedIn]);

  const updateNotifications = async (data) => {
    await dispatch(add(data));
  };

  if (loggedIn) {
    return (
      <ActionCableProvider url={`${process.env.WS_URL}?token=${userData.token.replace(/Bearer /, '')}`}>
        <ActionCableConsumer channel="WebNotificationsChannel" onReceived={(data) => updateNotifications(data)} onConnected={() => console.log('connected')}>
          <Layout>{children}</Layout>
        </ActionCableConsumer>
      </ActionCableProvider>
    );
  }
  return <Layout>{children}</Layout>;
};

MainContainer.propTypes = {
  children: PropTypes.node,
};

MainContainer.defaultProps = {
  children: null,
};

export default MainContainer;
