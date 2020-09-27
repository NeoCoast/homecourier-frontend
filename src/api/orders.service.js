import HTTP from './http';

const create = ({
  categories, description,
}) => (
  HTTP.post('/orders', {
    categories, description,
  })
    .then(({ data }) => data)
);

export default {
  create,
};
