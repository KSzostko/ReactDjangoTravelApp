import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelStopAPI } from 'services';

export const deleteTravelStop = createAsyncThunk(
  'travels/deleteTravelStop',
  async (travelStopId, thunkApi) => {
    try {
      return await TravelStopAPI.deleteStop(travelStopId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
