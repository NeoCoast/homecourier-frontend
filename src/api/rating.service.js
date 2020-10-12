import HTTP from './http';

const rateFromOrder = (rating) => HTTP.post('/rating', rating);

export default {
  rateFromOrder,
};
