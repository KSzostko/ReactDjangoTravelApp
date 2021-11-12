import { createAsyncThunk } from '@reduxjs/toolkit';
import { RoutingAPI } from 'services';

export const getRoute = createAsyncThunk(
  'map/getRoute',
  async ({ waypoints }, thunkApi) => {
    try {
      return await RoutingAPI.calculateRoute(waypoints);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
