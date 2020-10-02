import HTTP from './http';

const getCategories = () => (
  HTTP.get('/categories', {
  })
    .then(({ data }) => data)
);

export default {
  getCategories,
};
