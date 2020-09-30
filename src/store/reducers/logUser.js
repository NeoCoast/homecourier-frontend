const INITIAL_STATE = {
  data: undefined,
};

const logUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        data: action.data,
      };
    case 'LOGOUT':
      return {
        data: undefined,
      };
    default:
      return state;
  }
};

export default logUser;
