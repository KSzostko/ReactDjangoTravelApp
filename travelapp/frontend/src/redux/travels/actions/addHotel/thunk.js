import { createAsyncThunk } from '@reduxjs/toolkit';
import { HotelAPI } from 'services';

export const addHotel = createAsyncThunk(
  'travels/addHotel',
  async (hotelData, thunkApi) => {
    try {
      return await HotelAPI.create(hotelData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
