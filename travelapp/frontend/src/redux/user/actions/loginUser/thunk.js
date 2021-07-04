import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../../../../services';

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, thunkApi) => {
    try {
      return await UserAPI.login(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
