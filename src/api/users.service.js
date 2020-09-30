import HTTP from './http';

const create = ({
  email, name, lastname, birthDate, address, password, username,
}) => (
  HTTP.post('/users', {
    email, name, lastname, birthDate, address, password, username,
  })
    .then(({ data }) => data)
);

async function login(info) {
  const response = await HTTP.post('/users/login', info);
  return response;
}

const logout = (token) => {
  HTTP.delete('/users/logout', token);
};

export default {
  create,
  login,
  logout,
};
