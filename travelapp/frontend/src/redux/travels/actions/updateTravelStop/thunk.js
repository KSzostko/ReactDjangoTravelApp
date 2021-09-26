import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelStopAPI } from 'services';

export const updateTravelStop = createAsyncThunk(
  'travels/updateTravelStop',
  async (travelStopData, thunkApi) => {
    try {
      return await TravelStopAPI.update(travelStopData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
