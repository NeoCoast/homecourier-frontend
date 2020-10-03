import store from 'Store/store';
import HTTP from './http';

const create = ({
  title, helpeeId, categories, description,
}) => (
  HTTP.post('/orders', {
    title, helpeeId, categories, description,
  })
    .then(({ data }) => data)
);

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
};
