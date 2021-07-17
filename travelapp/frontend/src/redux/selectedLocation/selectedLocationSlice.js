import { createSlice } from '@reduxjs/toolkit';
import { getLocationDetailsReducer } from './getLocationDetails';

const initialState = {
  data: null,
  isLoading: false,
  isModalOpen: false,
  error: null,
};

const selectedLocationSlice = createSlice({
  name: 'selectedLocation',
  initialState,
  reducers: {
    clearLocationData(state) {
      state.data = null;
      state.isLoading = false;
      state.isModalOpen = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    getLocationDetailsReducer(builder);
  },
});

export const { clearLocationData } = selectedLocationSlice.actions;

export default selectedLocationSlice.reducer;
