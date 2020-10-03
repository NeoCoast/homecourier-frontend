import axios from 'axios';
import applyConverters from 'axios-case-converter';

const HTTP = applyConverters(
  axios.create({
    baseURL: `${process.env.API_URL}/api/v1/`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }),
);

export default HTTP;
