import { createSlice } from '@reduxjs/toolkit';
import { getRouteToStopReducer } from './getRouteToStop';

const initialState = {
  data: null,
  getRouteToStop: {
    data: null,
    isLoading: false,
    error: null,
  },
  earliestTime: null,
  isOpen: false,
};

const travelStopModalSlice = createSlice({
  name: 'travelStopModal',
  initialState,
  reducers: {
    closeModal(state) {
      state.isOpen = false;
      state.getRouteToStop = initialState.getRouteToStop;
      state.data = null;
      state.earliestTime = null;
    },
    chooseTravelStop(state, action) {
      state.isOpen = true;
      state.data = action.payload;
    },
    setEarliestTime(state, action) {
      state.earliestTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    getRouteToStopReducer(builder);
  },
});

export const {
  closeModal,
  chooseTravelStop,
  setEarliestTime,
} = travelStopModalSlice.actions;

export default travelStopModalSlice.reducer;
