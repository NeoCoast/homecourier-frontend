import store from 'Store/store';
import HTTP from './http';

const create = ({
  email, name, lastname, birthDate, address, password, username,
}) => (
  HTTP.post('/users', {
    email, name, lastname, birthDate, address, password, username,
  })
    .then(({ data }) => data)
);

const login = (info) => HTTP.post('/users/login', info);

const logout = () => HTTP.delete('/users/logout');

const profileData = (user) => HTTP.get(`/users/profile/view?username=${user}`);

const ratingsData = (page, user) => HTTP.get(`/users/ratings/view?id=${user}`, page);

HTTP.interceptors.request.use((
  async (config) => {
    if (store.getState().logUser.loggedIn) {
      const configuration = config;
      configuration.headers = {
        ...config.headers,
        'Authorization': store.getState().logUser.data.token,
      };
      return configuration;
    }
    return config;
  }
));

export default {
  create,
  login,
  logout,
  profileData,
  ratingsData,
};
