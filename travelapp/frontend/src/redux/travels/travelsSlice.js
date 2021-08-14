import { createSlice } from '@reduxjs/toolkit';
import { createTravelReducer } from './actions/createTravel';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  current: {
    data: null,
    isLoading: false,
    error: null,
  },
};

const currentTravelSlice = createSlice({
  name: 'currentTravel',
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
  },
});

export const { clearCurrentTravel } = currentTravelSlice.actions;

export default currentTravelSlice.reducer;
