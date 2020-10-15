import HTTP from './http';

const getNotifications = (pageNumber = 0) => HTTP.get(`/notifications?page=${pageNumber}`);

const setSeenNotifications = (notificationsId) => HTTP.post('/notifications/seen', { notificationsId });

export default { getNotifications, setSeenNotifications };
