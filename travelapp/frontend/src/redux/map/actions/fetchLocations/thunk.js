import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlacesAPI } from '../../../../services';

export const fetchLocations = createAsyncThunk(
  'map/locations/fetch',
  async ({ latRange, lonRange }, thunkApi) => {
    try {
      return await PlacesAPI.findPlacesInBox({
        latRange,
        lonRange,
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
