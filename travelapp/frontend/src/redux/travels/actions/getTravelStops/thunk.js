import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelStopAPI } from '../../../../services';

export const getTravelStops = createAsyncThunk(
  'travels/getTravelStops',
  async (travelId, thunkApi) => {
    try {
      return await TravelStopAPI.getByTravelId(travelId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
