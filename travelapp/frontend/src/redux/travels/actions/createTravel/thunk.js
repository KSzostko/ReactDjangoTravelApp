import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelAPI } from '../../../../services';

export const createTravel = createAsyncThunk(
  'travels/createTravel',
  async (travelData, thunkApi) => {
    try {
      return await TravelAPI.create(travelData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
