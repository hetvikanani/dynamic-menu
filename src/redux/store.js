import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import menuReducer from './menu/menuSlice';

const menuPersistConfig = {
  key: 'menu',
  storage,
};

const persistedMenuReducer = persistReducer(menuPersistConfig, menuReducer);

const store = configureStore({
  reducer: {
    menu: persistedMenuReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
