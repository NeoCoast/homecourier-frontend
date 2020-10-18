import { jsonToFormData } from 'Helpers/utils.helper';
import HTTP from './http';

const create = (helpee) => {
  const body = jsonToFormData(helpee, 'helpee');

  return HTTP.post('/helpees/signup', body)
    .then(({ data }) => data)
    .catch((error) => error.response);
};

const info = (id) => HTTP.get(`/helpees/${id}`);

const pendingRating = (id) => HTTP.post('helpees/ratingPending', { helpee_id: id }).then(({ data }) => data);

export default {
  create,
  info,
  pendingRating,
};
