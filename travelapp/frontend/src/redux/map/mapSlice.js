import { createSlice } from '@reduxjs/toolkit';
import mapConstants from '../../setup/mapConstants';
import { fetchLocationsReducer } from './actions/fetchLocations';

const initialState = {
  center: mapConstants.defaultCenter,
  zoom: mapConstants.zoom,
  locations: [],
  isLoading: false,
  error: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter(state, action) {
      state.center = action.payload;
    },
    setZoom(state, action) {
      state.zoom = action.payload;
    },
  },
  extraReducers: (builder) => {
    fetchLocationsReducer(builder);
  },
});

export const { setCenter, setZoom } = mapSlice.actions;
export default mapSlice.reducer;
