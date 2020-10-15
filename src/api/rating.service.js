import HTTP from './http';

const rateVolunteer = (rating) => HTTP.post('/volunteers/rating', rating);

const rateHelpee = (rating) => HTTP.post('/helpees/rating', rating);

export default {
  rateVolunteer,
  rateHelpee,
};
