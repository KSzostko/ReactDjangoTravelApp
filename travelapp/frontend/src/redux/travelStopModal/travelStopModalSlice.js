import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isOpen: false,
};

const selectedLocationSlice = createSlice({
  name: 'travelStopModal',
  initialState,
  reducers: {
    closeModal(state) {
      state.isOpen = false;
      state.data = null;
    },
    chooseTravelStop(state, action) {
      state.isOpen = true;
      state.data = action.payload;
    },
  },
});

export const { closeModal, chooseTravelStop } = selectedLocationSlice.actions;

export default selectedLocationSlice.reducer;
