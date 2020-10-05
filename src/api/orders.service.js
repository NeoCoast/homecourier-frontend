import HTTP from './http';

const getOrders = (status) => HTTP.get(`/orders/show/all?status=${status}`);

const take = ({ volunteerId, orderId }) => HTTP.post('/orders/take', {
  volunteerId,
  orderId,
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
};
