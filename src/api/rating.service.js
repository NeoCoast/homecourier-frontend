import HTTP from './http';

const rateVolunteer = (rating) => HTTP.post('/helpees/rating', rating);

const rateHelpee = (rating) => HTTP.post('/volunteers/rating', rating);

export default {
  rateVolunteer,
  rateHelpee,
};
