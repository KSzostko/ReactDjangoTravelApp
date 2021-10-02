import { createAsyncThunk } from '@reduxjs/toolkit';
import { RoutingAPI } from 'services';

export const calculateNewRoute = createAsyncThunk(
  'travelStopModal/calculateNewRoute',
  async ({ waypoints, transport }, thunkApi) => {
    try {
      return await RoutingAPI.calculateRoute(waypoints, { transport });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
