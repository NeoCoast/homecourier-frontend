import HTTP from './http';

const getOrders = (status) => HTTP.get(`/orders/show/all?status=${status}`);

const getMyOrders = (helpeeId) => HTTP.get(`/orders/show/helpee?helpee_id=${helpeeId}`);

const take = ({ volunteerId, orderId }) => HTTP.post('/orders/take', {
  volunteerId,
  orderId,
}).then(({ data }) => data);

const setOrderStatus = ({ orderId, status }) => HTTP.post('/status', {
  orderId,
  status,
}).then(({ data }) => data);

const create = ({
  title, helpeeId, categories, description,
}) => HTTP.post('/orders', {
  title,
  helpeeId,
  categories,
  description,
}).then(({ data }) => data);

export default {
  getOrders,
  take,
  create,
  getMyOrders,
  setOrderStatus,
};
