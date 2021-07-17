import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import mapReducer from './map/mapSlice';
import selectedLocationReducer from './selectedLocation/selectedLocationSlice';

const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
  selectedLocation: selectedLocationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
