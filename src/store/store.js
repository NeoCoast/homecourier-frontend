import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from '@reduxjs/toolkit';
import logUser from 'Reducers/logUser';
import userNotifications from 'Reducers/userNotifications';

const rootReducer = combineReducers({
  logUser,
  userNotifications,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['userNotifications'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
