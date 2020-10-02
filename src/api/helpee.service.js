import HTTP from './http';

const create = (helpee) =>
  HTTP.post('/helpees/signup', { helpee })
    .then(({ data }) => data)
    .catch((error) => error.response);

export default {
  create,
};
