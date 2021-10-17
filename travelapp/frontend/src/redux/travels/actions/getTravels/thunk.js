import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelAPI } from 'services';

export const getTravels = createAsyncThunk(
  'travels/getTravels',
  async (sortBy = '', thunkApi) => {
    try {
      return await TravelAPI.getList(sortBy);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
