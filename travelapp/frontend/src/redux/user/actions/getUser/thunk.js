import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../../../../services';

export const getUser = createAsyncThunk(
  'user/getByToken',
  async (token, thunkApi) => {
    try {
      return await UserAPI.getUserByToken(token);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
