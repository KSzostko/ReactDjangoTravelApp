import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelStopAPI } from '../../../../services';

export const addTravelStop = createAsyncThunk(
  'travels/addTravelStop',
  async (travelStopData, thunkApi) => {
    try {
      return await TravelStopAPI.create(travelStopData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
