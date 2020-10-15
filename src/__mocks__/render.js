import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render as rtlRender } from '@testing-library/react';
import store from 'Store/store';

function render(ui, { ...renderOptions } = {}) {
  const history = createBrowserHistory();
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
    store,
  };
}

export default render;
