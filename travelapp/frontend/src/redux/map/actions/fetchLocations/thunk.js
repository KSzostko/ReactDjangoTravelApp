import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlacesAPI } from '../../../../services';

export const fetchLocations = createAsyncThunk(
  'map/locations/fetch',
  async ({ lat, lng, radius }, thunkApi) => {
    try {
      return await PlacesAPI.findPlacesInRadius({
        radius,
        lon: lng,
        lat,
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
