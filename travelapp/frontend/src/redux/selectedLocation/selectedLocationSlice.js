import { createSlice } from '@reduxjs/toolkit';
import { getLocationDetailsReducer } from './getLocationDetails';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const selectedLocationSlice = createSlice({
  name: 'selectedLocation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getLocationDetailsReducer(builder);
  },
});

export default selectedLocationSlice.reducer;
