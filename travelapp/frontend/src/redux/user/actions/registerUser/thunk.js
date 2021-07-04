import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../../../../services';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkApi) => {
    try {
      return await UserAPI.register(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
