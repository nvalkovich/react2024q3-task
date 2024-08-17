import { createWrapper } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { cardsReducer, themeReducer } from './slices';
import { pokemonCardsApi } from '../services/api/pokemonCardsApi';

const rootReducer = combineReducers({
  cards: cardsReducer,
  theme: themeReducer,
  [pokemonCardsApi.reducerPath]: pokemonCardsApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(pokemonCardsApi.middleware),
  });

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

const store = makeStore();

export default store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
