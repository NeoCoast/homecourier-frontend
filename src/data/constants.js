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
  accepted: 'Comenzar',
  in_process: 'Finalizar',
};

export const ORDER_STATUS_PHASE_NUMBER = {
  created: 0,
  accepted: 1,
  in_process: 2,
  finished: 3,
  cancelled: 3,
};

export const NEXT_STATUS = {
  created: 'accepted',
  accepted: 'in_process',
  in_process: 'finished',
};

export const STEP_DATA = {
  steps: 3,
  stepsLabel: [
    'Orden tomada',
    'Realizando orden',
    'Entregado',
  ],
  stepsContent: [
    'El voluntario se dirige a su ubicación para comenzar su orden.',
    'El voluntario se dirige a conseguir sus productos.',
    'La orden ha sido realizada. Muchas gracias.',
  ],
};
