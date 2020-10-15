/* eslint-disable import/prefer-default-export */

export const ROUTES = {
  about: '/about-us',
  home: '/',
  register: '/register',
  login: '/login',
  orders: '/orders',
  registerVolunteer: '/register-volunteer',
  profile: '/profile',
  myOrders: '/my-orders',
};

export const ORDER_STATUS_ACTIONS = {
  created: 'Postularse',
  in_process: 'Finalizar',
};

export const NEXT_STATUS = {
  created: 'accepted',
  accepted: 'in_process',
  in_process: 'finished',
};
