const INITIAL_STATE = {
  data: undefined,
};

const logUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        data: action.data,
        loggedIn: true,
      };
    case 'LOGOUT':
      return {
        data: '',
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default logUser;
