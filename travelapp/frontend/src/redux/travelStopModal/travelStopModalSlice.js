import { createSlice } from '@reduxjs/toolkit';
import { getRouteToStopReducer } from './actions/getRouteToStop';
import { getRouteFromStopReducer } from './actions/getRouteFromStop';
import { calculateNewRouteReducer } from './actions/calculateNewRoute';

const initialState = {
  data: null,
  getRouteToStop: {
    data: null,
    isLoading: false,
    error: null,
  },
  getRouteFromStop: {
    data: null,
    isLoading: false,
    error: null,
  },
  getNewRoute: {
    data: null,
    isLoading: false,
    error: null,
  },
  earliestTime: null,
  latestTime: null,
  isOpen: false,
};

const travelStopModalSlice = createSlice({
  name: 'travelStopModal',
  initialState,
  reducers: {
    closeModal(state) {
      state.isOpen = false;
      state.getRouteToStop = initialState.getRouteToStop;
      state.getRouteFromStop = initialState.getRouteFromStop;
      state.getNewRoute = initialState.getNewRoute;
    },
    chooseTravelStop(state, action) {
      state.isOpen = true;
      state.data = action.payload;
    },
    setEarliestTime(state, action) {
      state.earliestTime = action.payload;
    },
    setLatestTime(state, action) {
      state.latestTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    getRouteToStopReducer(builder);
    getRouteFromStopReducer(builder);
    calculateNewRouteReducer(builder);
  },
});

export const {
  closeModal,
  chooseTravelStop,
  setEarliestTime,
  setLatestTime,
} = travelStopModalSlice.actions;

export default travelStopModalSlice.reducer;
