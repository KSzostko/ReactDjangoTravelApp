import { createSlice } from '@reduxjs/toolkit';
import { getTravelsReducer } from './actions/getTravels';
import { createTravelReducer } from './actions/createTravel';
import { deleteTravelReducer } from './actions/deleteTravel';
import { updateTravelReducer } from './actions/updateTravel';
import { getTravelByIdReducer } from './actions/getTravelById';
import { getTravelStopsReducer } from './actions/getTravelStops';
import { addTravelStopReducer } from './actions/addTravelStop';
import { updateTravelStopReducer } from './actions/updateTravelStop';
import { deleteTravelStopReducer } from './actions/deleteTravelStop';
import { getTravelRoutesReducer } from './actions/getTravelRoutes';
import { addTravelRouteReducer } from './actions/addTravelRoute';
import { getAllPhotosReducer } from './actions/getAllPhotos';
import { addPhotoReducer } from './actions/addPhoto';
import { getWaypointsSequenceReducer } from './actions/getWaypointsSequence';
import { getHotelDetailsReducer } from './actions/getHotelDetails';
import { addHotelReducer } from './actions/addHotel';
import { getTravelPeriodReducer } from './actions/getTravelPeriod';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  current: {
    data: null,
    isLoading: false,
    error: null,
  },
  // period for current travel
  getTravelPeriod: {
    data: null,
    isLoading: false,
    error: null,
  },
  // hotel details for current travel
  getHotelDetails: {
    data: null,
    isLoading: false,
    error: null,
  },
  // travel stops for current travel
  getTravelStops: {
    data: [],
    isLoading: false,
    error: null,
  },
  // travel routes for current travel
  getTravelRoutes: {
    data: [],
    isLoading: false,
    error: null,
  },
  // for every travel, not just current
  getAllPhotos: {
    data: [],
    isLoading: false,
    error: null,
  },
  // for current travel
  getWaypointsSequence: {
    data: null,
    isLoading: false,
    error: null,
  },
  isSequenceModalOpen: true,
};

const travelsSlice = createSlice({
  name: 'travels',
  initialState,
  reducers: {
    clearCurrentTravel(state) {
      state.current.data = null;
      state.current.isLoading = false;
      state.current.error = null;
    },
    setIsSequenceModalOpen(state, action) {
      state.isSequenceModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    getTravelsReducer(builder);
    createTravelReducer(builder);
    deleteTravelReducer(builder);
    updateTravelReducer(builder);
    getTravelByIdReducer(builder);
    getTravelStopsReducer(builder);
    addTravelStopReducer(builder);
    updateTravelStopReducer(builder);
    deleteTravelStopReducer(builder);
    getTravelRoutesReducer(builder);
    addTravelRouteReducer(builder);
    getAllPhotosReducer(builder);
    addPhotoReducer(builder);
    getWaypointsSequenceReducer(builder);
    getHotelDetailsReducer(builder);
    addHotelReducer(builder);
    getTravelPeriodReducer(builder);
  },
});

export const {
  clearCurrentTravel,
  setIsSequenceModalOpen,
} = travelsSlice.actions;

export default travelsSlice.reducer;
