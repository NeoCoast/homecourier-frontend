import axios from 'axios';
import applyConverters from 'axios-case-converter';
import store from 'Store/store';

const HTTP = applyConverters(
  axios.create({
    baseURL: `${process.env.API_URL}/api/v1/`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  }),
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

export default HTTP;
