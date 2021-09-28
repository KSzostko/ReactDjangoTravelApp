import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelRouteAPI } from 'services';

export const getRouteFromStop = createAsyncThunk(
  'travelPeriodModal/getRouteFromStop',
  async (travelStopId, thunkApi) => {
    try {
      return await TravelRouteAPI.getRouteForStop(travelStopId, 'start');
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
