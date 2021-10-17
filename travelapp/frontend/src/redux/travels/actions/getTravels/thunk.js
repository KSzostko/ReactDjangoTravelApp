import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelAPI } from 'services';

export const getTravels = createAsyncThunk(
  'travels/getTravels',
  async (travelOptions, thunkApi) => {
    try {
      return await TravelAPI.getList(travelOptions);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
