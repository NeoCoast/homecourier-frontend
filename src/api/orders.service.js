import HTTP from './http';

const create = ({
  title, helpeeId, categories, description,
}) => (
  HTTP.post('/orders', {
    title, helpeeId, categories, description,
  })
    .then(({ data }) => data)
);

export default {
  create,
};
