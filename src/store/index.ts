import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
import {
  searchReducer,
  cardsReducer,
  paginationReducer,
  loadingReducer,
} from './slices';
import { pokemonCardsApi } from '../services/pokemonCardsApi';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  search: searchReducer,
  pagination: paginationReducer,
  loading: loadingReducer,
  cards: cardsReducer,
  [pokemonCardsApi.reducerPath]: pokemonCardsApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [pokemonCardsApi.reducerPath],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(pokemonCardsApi.middleware),
  });
};

const store = setupStore({});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
