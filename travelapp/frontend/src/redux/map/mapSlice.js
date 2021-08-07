import { createSlice } from '@reduxjs/toolkit';
import mapConstants from '../../setup/mapConstants';
import { fetchLocationsReducer } from './actions/fetchLocations';
import { getSearchDataReducer } from './actions/getSearchData';
import { getRouteReducer } from './actions/getRoute';

const initialState = {
  getSearchData: {
    data: null,
    isLoading: false,
    error: null,
  },
  getRoute: {
    data: {
      summary: null,
      path: [],
    },
    isLoading: false,
    error: null,
  },
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
    getSearchDataReducer(builder);
    getRouteReducer(builder);
  },
});

export const { setCenter, setZoom } = mapSlice.actions;
export default mapSlice.reducer;
