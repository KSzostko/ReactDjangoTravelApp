import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelAPI } from 'services';

export const updateTravel = createAsyncThunk(
  'travels/updateTravel',
  async (travelData, thunkApi) => {
    try {
      return await TravelAPI.update(travelData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
