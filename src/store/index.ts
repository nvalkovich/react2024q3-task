import { combineReducers, configureStore } from '@reduxjs/toolkit';

import formReducer from './slices/formSlice';
import countriesReducer from './slices/countriesSlice';

export const rootReducer = combineReducers({
  form: formReducer,
  countries: countriesReducer
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

const store = setupStore({});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
