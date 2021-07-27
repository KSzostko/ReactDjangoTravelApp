import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import mapReducer from './map/mapSlice';
import selectedLocationReducer from './selectedLocation/selectedLocationSlice';
import travelStopModalReducer from './travelStopModal/travelStopModalSlice';

const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
  selectedLocation: selectedLocationReducer,
  travelStopModal: travelStopModalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
