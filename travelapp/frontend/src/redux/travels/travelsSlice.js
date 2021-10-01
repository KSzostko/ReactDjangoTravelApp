import { createSlice } from '@reduxjs/toolkit';
import { createTravelReducer } from './actions/createTravel';
import { getTravelByIdReducer } from './actions/getTravelById';
import { getTravelStopsReducer } from './actions/getTravelStops';
import { addTravelStopReducer } from './actions/addTravelStop';
import { updateTravelStopReducer } from './actions/updateTravelStop';
import { deleteTravelStopReducer } from './actions/deleteTravelStop';
import { getTravelRoutesReducer } from './actions/getTravelRoutes';
import { addTravelRouteReducer } from './actions/addTravelRoute';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  current: {
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
  },
  extraReducers: (builder) => {
    createTravelReducer(builder);
    getTravelByIdReducer(builder);
    getTravelStopsReducer(builder);
    addTravelStopReducer(builder);
    updateTravelStopReducer(builder);
    deleteTravelStopReducer(builder);
    getTravelRoutesReducer(builder);
    addTravelRouteReducer(builder);
  },
});

export const { clearCurrentTravel } = travelsSlice.actions;

export default travelsSlice.reducer;
