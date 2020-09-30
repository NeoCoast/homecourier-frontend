import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import AppRedux from './containers/Redux/App';
import store from './store/store';

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRedux />
    </PersistGate>
  </Provider>,
  document.getElementById('mount')
);
