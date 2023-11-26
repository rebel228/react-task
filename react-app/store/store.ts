import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/searchSlice';
import queryParamsReducer from './reducers/queryParamsSlice';
import { pokemonAPI } from '../services/PokemonService';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  searchReducer,
  queryParamsReducer,
  [pokemonAPI.reducerPath]: pokemonAPI.reducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore);
