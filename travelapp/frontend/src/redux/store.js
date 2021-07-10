import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import mapReducer from './map/mapSlice';

const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
