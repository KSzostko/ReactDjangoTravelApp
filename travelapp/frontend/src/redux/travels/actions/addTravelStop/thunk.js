import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelStopAPI } from 'services';

export const addTravelStop = createAsyncThunk(
  'travels/addTravelStop',
  async (travelStopData, thunkApi) => {
    try {
      const { attraction, ...rest } = travelStopData;
      return await TravelStopAPI.create({
        attraction: attraction.id,
        ...rest,
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
