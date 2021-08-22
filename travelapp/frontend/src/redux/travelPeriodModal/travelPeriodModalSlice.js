import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attractionId: null,
  date: null,
  time: null,
  isOpen: false,
};

const travelPeriodModalSlice = createSlice({
  name: 'travelPeriodModal',
  initialState,
  reducers: {
    closeModal(state) {
      state.attractionId = null;
      state.date = null;
      state.time = null;
      state.isOpen = false;
    },
    openModal(state, action) {
      state.attractionId = action.payload;
      state.isOpen = true;
    },
    chooseDate(state, action) {
      state.date = action.payload;
    },
    chooseTime(state, action) {
      state.time = action.payload;
    },
  },
});

export const {
  closeModal,
  openModal,
  chooseDate,
  chooseTime,
} = travelPeriodModalSlice.actions;

export default travelPeriodModalSlice.reducer;
