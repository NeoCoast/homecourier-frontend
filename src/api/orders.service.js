import HTTP from './http';

const getOrders = (status, id) => HTTP.get('/orders/show/all', { params: { 'status': status, 'user_id': id } });

const getApplicationsList = (orderId) => HTTP.get('/orders/show/volunteers', { params: { 'order_id': orderId } })
  .then(({ data }) => data);

const getMyOrders = (helpeeId) => HTTP.get(`/orders/show/helpee?helpee_id=${helpeeId}`);

const getVolunteerOrders = (volunteerId) => HTTP.get(`/orders/show/volunteer?volunteer_id=${volunteerId}`);

const take = ({ volunteerId, orderId }) => HTTP.post('/orders/take', {
  volunteerId,
  orderId,
}).then(({ data }) => data);

const setOrderStatus = ({ orderId, status }) => HTTP.post('orders/status', {
  orderId,
  status,
}).then(({ data }) => data);

const getOrdersMap = (latTopRight, lngTopRight, latDownLeft, lngDownLeft) => HTTP.get('/orders/show/map', {
  params: {
    lat_top_right: latTopRight,
    lng_top_right: lngTopRight,
    lat_down_left: latDownLeft,
    lng_down_left: lngDownLeft,
  },
}).then(({ data }) => data);

const create = ({
  title, helpeeId, categories, description,
}) => HTTP.post('/orders', {
  title,
  helpeeId,
  categories,
  description,
}).then(({ data }) => data);

const acceptVolunteerForOrder = (orderId, volunteerId) => HTTP.post('/orders/accept', { 'order_id': orderId, 'volunteer_id': volunteerId })
  .then(({ data }) => data);

const ordersForDistance = (id, ascDesc) => HTTP.get('/orders/show/distance', { params: { 'user_id': id, 'asc_desc': ascDesc } });

const ordersForAntiquity = (id, status, ascDesc) => HTTP.get('/orders/show/all', { params: { 'user_id': id, 'status': status, 'asc_desc': ascDesc } });

export default {
  getOrders,
  getApplicationsList,
  take,
  create,
  acceptVolunteerForOrder,
  getMyOrders,
  setOrderStatus,
  getVolunteerOrders,
  getOrdersMap,
  ordersForDistance,
  ordersForAntiquity,
};
