import { createSlice } from '@reduxjs/toolkit';
import { getRouteToStopReducer } from './getRouteToStop';
import { getRouteFromStopReducer } from './getRouteFromStop';

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
  },
});

export const {
  closeModal,
  chooseTravelStop,
  setEarliestTime,
  setLatestTime,
} = travelStopModalSlice.actions;

export default travelStopModalSlice.reducer;
