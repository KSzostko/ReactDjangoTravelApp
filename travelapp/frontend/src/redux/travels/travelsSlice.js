import { createSlice } from '@reduxjs/toolkit';
import { createTravelReducer } from './actions/createTravel';
import { getTravelByIdReducer } from './actions/getTravelById';
import { getTravelStopsReducer } from './actions/getTravelStops';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  current: {
    data: null,
    isLoading: false,
    error: null,
  },
  getTravelStops: {
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
  },
});

export const { clearCurrentTravel } = travelsSlice.actions;

export default travelsSlice.reducer;
