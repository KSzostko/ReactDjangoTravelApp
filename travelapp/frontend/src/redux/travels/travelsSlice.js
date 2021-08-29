import { createSlice } from '@reduxjs/toolkit';
import { createTravelReducer } from './actions/createTravel';
import { getTravelByIdReducer } from './actions/getTravelById';
import { getTravelStopsReducer } from './actions/getTravelStops';
import { addTravelStopReducer } from './actions/addTravelStop';

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
  },
});

export const { clearCurrentTravel } = travelsSlice.actions;

export default travelsSlice.reducer;
