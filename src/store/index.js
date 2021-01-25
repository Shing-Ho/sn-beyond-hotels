import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';

import configureStore from 'store/config';
import history from 'store/history';

import coreReducer from 'store/core/reducers';
import hotelReducer from 'store/hotel/reducers';
import bookingReducer from 'store/booking/reducers';
import shoppingReducer from 'store/shopping/reducers';
import gasReducer from 'store/gas/reducers';
import authReducer from 'store/auth/reducers';
import usersReducer from 'store/admin/reducers';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const corePersistConfig = {
  key: 'core',
  storage,
  whitelist: ['locale', 'currentMenu'],
};
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'],
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    core: persistReducer(corePersistConfig, coreReducer),
    auth: persistReducer(authPersistConfig, authReducer),
    hotel: persistReducer(
      {
        key: 'hotel',
        storage,
      },
      hotelReducer,
    ),
    booking: persistReducer(
      {
        key: 'booking',
        storage,
      },
      bookingReducer,
    ),
    shopping: persistReducer(
      {
        key: 'shopping',
        storage,
      },
      shoppingReducer,
    ),
    gas: persistReducer(
      {
        key: 'gas',
        storage,
      },
      gasReducer,
    ),
    admin: persistReducer(
      {
        key: 'admin',
        storage,
      },
      usersReducer,
    ),
    router: connectRouter(history),
  }),
);

const initialState = window.initialReduxState;
const { store } = configureStore(history, initialState, rootReducer);

const persistor = persistStore(store);

export { store, history, persistor };
