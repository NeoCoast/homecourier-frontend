import { jsonToFormData } from 'Helpers/utils.helper';
import HTTP from './http';

const create = (volunteer) => {
  const body = jsonToFormData(volunteer, 'volunteer');

  return HTTP.post('volunteers/signup', body)
    .then(({ data }) => data)
    .catch((error) => error.response);
};

export default {
  create,
};
