const INITIAL_STATE = {
  notifications: [],
};

const userNotifications = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOAD_ALL':
      return {
        ...state,
        notifications: [...action.data],
      };
    case 'ADD':
      return {
        ...state,
        notifications: [action.data, ...state.notifications],
      };
    case 'REMOVE_ALL':
      return {
        notifications: [],
      };
    default:
      return state;
  }
};

export default userNotifications;
