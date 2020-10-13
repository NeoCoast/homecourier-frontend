import { jsonToFormData } from 'Helpers/utils.helper';
import HTTP from './http';

const create = (helpee) => {
  const body = jsonToFormData(helpee, 'helpee');

  return HTTP.post('/helpees/signup', body)
    .then(({ data }) => data)
    .catch((error) => error.response);
};

export default {
  create,
};
