import { createAsyncThunk } from '@reduxjs/toolkit';
import { RoutingAPI } from 'services';

export const getRoute = createAsyncThunk(
  'map/getRoute',
  async ({ waypoints }, thunkApi) => {
    try {
      console.log(`waypoints in reducer`);
      console.table(waypoints);
      return await RoutingAPI.calculateRoute(waypoints);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
