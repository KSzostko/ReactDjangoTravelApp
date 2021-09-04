import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelAPI } from 'services';

export const getTravelById = createAsyncThunk(
  'travels/getTravelById',
  async (travelId, thunkApi) => {
    try {
      return await TravelAPI.getById(travelId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
