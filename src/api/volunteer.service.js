import HTTP from './http';

const create = (volunteer) => {
  const body = new FormData();

  body.set('volunteer[email]', volunteer.email);
  body.set('volunteer[password]', volunteer.password);
  body.set('volunteer[username]', volunteer.username);
  body.set('volunteer[name]', volunteer.name);
  body.set('volunteer[lastname]', volunteer.lastname);
  body.set('volunteer[birth_date]', volunteer.birthDate);
  body.set('volunteer[address]', volunteer.address);
  if (volunteer.avatar) body.set('volunteer[avatar]', volunteer.avatar);
  body.set('volunteer[document_number]', volunteer.userId);
  body.set('volunteer[document_type_id]', 1); // For now we only have one docType and it's CI.
  body.set('volunteer[document_face_pic]', volunteer.documentFace);
  body.set('volunteer[document_back_pic]', volunteer.documentBack);

  return HTTP.post('volunteers/signup', body)
    .then(({ data }) => data)
    .catch((error) => error.response);
};

export default {
  create,
};
