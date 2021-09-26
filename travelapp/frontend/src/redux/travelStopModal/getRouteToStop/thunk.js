import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelRouteAPI } from 'services';

export const getRouteToStop = createAsyncThunk(
  'travelPeriodModal/getRouteToStop',
  async ({ travelStopId, role = 'destination' }, thunkApi) => {
    try {
      return await TravelRouteAPI.getRouteForStop(travelStopId, role);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
