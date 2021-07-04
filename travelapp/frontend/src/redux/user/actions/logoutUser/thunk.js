import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../../../../services';

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (token, thunkApi) => {
    try {
      return await UserAPI.logout(token);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
