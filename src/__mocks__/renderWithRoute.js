import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import logUser from 'Reducers/logUser';
import userNotifications from 'Reducers/logUser';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  logUser,
  userNotifications,
});

function render(
  ui,
  {
    route = '/',
    initialState,
    history = createMemoryHistory({ initialEntries: [route] }),
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => ( // eslint-disable-line
    <Router history={history}>
      <Provider store={store}>
        {children}
      </Provider>
    </Router>
  );

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    history,
  };
}

export default render;
