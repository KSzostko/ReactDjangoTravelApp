import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import mapReducer from './map/mapSlice';
import selectedLocationReducer from './selectedLocation/selectedLocationSlice';
import travelStopModalReducer from './travelStopModal/travelStopModalSlice';
import travelsReducer from './travels/travelsSlice';
import travelPeriodModalReducer from './travelPeriodModal/travelPeriodModalSlice';

const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
  selectedLocation: selectedLocationReducer,
  travelStopModal: travelStopModalReducer,
  travels: travelsReducer,
  travelPeriodModal: travelPeriodModalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
