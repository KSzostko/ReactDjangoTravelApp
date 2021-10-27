import { createAsyncThunk } from '@reduxjs/toolkit';
import { HotelAPI } from 'services';

export const getHotelDetails = createAsyncThunk(
  'travels/getHotelDetails',
  async (hotelId, thunkApi) => {
    try {
      return await HotelAPI.getById(hotelId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
