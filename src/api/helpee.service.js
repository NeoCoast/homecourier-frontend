import HTTP from './http';

const create = (helpee) => {
  const body = new FormData();

  body.set('helpee[email]', helpee.email);
  body.set('helpee[password]', helpee.password);
  body.set('helpee[username]', helpee.username);
  body.set('helpee[name]', helpee.name);
  body.set('helpee[lastname]', helpee.lastname);
  body.set('helpee[birth_date]', helpee.birthDate);
  body.set('helpee[address]', helpee.address);
  if (helpee.avatar) body.set('helpee[avatar]', helpee.avatar);
  return HTTP.post('/helpees/signup', body)
    .then(({ data }) => data)
    .catch((error) => error.response);
};

export default {
  create,
};
