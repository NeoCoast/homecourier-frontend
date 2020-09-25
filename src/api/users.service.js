import HTTP from './http';

const create = ({
  email, name, lastname, birthDate, address, password, username,
}) => (
  HTTP.post('/users', {
    email, name, lastname, birthDate, address, password, username,
  })
    .then(({ data }) => data)
);

export default {
  create,
};
