import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelAPI } from 'services';

export const deleteTravel = createAsyncThunk(
  'travels/deleteTravel',
  async (travelId, thunkApi) => {
    try {
      return await TravelAPI.deleteTravel(travelId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
