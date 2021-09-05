import { createSlice } from '@reduxjs/toolkit';
import { chooseRouteReducer } from './chooseRoute';

const initialState = {
  attraction: null,
  date: null,
  time: null,
  getRoute: {
    data: null,
    isLoading: false,
    error: null,
  },
  isOpen: false,
};

const travelPeriodModalSlice = createSlice({
  name: 'travelPeriodModal',
  initialState,
  reducers: {
    closeModal(state) {
      state.attraction = null;
      state.date = null;
      state.time = null;
      state.isOpen = false;
    },
    openModal(state, action) {
      state.attraction = action.payload;
      state.isOpen = true;
    },
    chooseDate(state, action) {
      state.date = action.payload;
    },
    chooseTime(state, action) {
      state.time = action.payload;
    },
  },
  extraReducers: (builder) => {
    chooseRouteReducer(builder);
  },
});

export const {
  closeModal,
  openModal,
  chooseDate,
  chooseTime,
} = travelPeriodModalSlice.actions;

export default travelPeriodModalSlice.reducer;
