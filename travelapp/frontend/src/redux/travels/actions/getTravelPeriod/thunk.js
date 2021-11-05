import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelAPI } from 'services';

export const getTravelPeriod = createAsyncThunk(
  'travels/getTravelPeriod',
  async (travelId, thunkApi) => {
    try {
      return await TravelAPI.getTravelPeriod(travelId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
