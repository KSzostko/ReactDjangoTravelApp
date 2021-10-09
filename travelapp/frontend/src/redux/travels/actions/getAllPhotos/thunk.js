import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelPhotoAPI } from 'services';

export const getAllPhotos = createAsyncThunk(
  'travels/getAllPhotos',
  async (thunkApi) => {
    try {
      return await TravelPhotoAPI.getList();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
