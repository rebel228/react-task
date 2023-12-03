import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formsReducer from './reducers/formDataSlice';
import countiesReducer from './reducers/countriesSLice';

const rootReducer = combineReducers({
  formsReducer,
  countiesReducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
