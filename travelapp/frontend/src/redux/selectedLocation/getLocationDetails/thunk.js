import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlacesAPI } from '../../../services';

export const getLocationsDetails = createAsyncThunk(
  'selected/getLocationsDetails',
  async (xid, thunkApi) => {
    try {
      return await PlacesAPI.getPlaceDetails(xid);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
