import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelRouteAPI } from 'services';

export const addTravelRoute = createAsyncThunk(
  'travels/addTravelRoute',
  async (travelRouteData, thunkApi) => {
    try {
      return await TravelRouteAPI.create(travelRouteData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
