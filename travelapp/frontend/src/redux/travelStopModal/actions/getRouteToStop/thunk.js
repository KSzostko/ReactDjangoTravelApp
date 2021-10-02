import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelRouteAPI } from 'services';

export const getRouteToStop = createAsyncThunk(
  'travelPeriodModal/getRouteToStop',
  async (travelStopId, thunkApi) => {
    try {
      return await TravelRouteAPI.getRouteForStop(travelStopId, 'destination');
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
