import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelPhotoAPI } from 'services';

export const addPhoto = createAsyncThunk(
  'travels/addPhoto',
  async (travelPhotoData, thunkApi) => {
    try {
      return await TravelPhotoAPI.create(travelPhotoData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
