import { createAsyncThunk } from '@reduxjs/toolkit';
import { TravelPhotoAPI } from 'services';

export const getAllPhotos = createAsyncThunk(
  'travels/getAllPhotos',
  async (sortBy = '', thunkApi) => {
    try {
      return await TravelPhotoAPI.getList(sortBy);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
