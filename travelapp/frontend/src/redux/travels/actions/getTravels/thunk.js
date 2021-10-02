import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelAPI } from 'services';

export const getTravels = createAsyncThunk('travels/getTravels', async () => {
  try {
    return await TravelAPI.getList();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
