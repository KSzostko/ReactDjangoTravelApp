import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelRouteAPI } from 'services';

export const getTravelRoutes = createAsyncThunk(
  'travels/getTravelRoutes',
  async (travelId, thunkApi) => {
    try {
      return await TravelRouteAPI.getByTravelId(travelId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
