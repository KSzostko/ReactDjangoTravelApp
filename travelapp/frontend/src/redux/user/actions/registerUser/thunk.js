import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../../../../services';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkApi) => {
    const { data, status } = await UserAPI.register(userData);

    if (status !== 200) {
      return thunkApi.rejectWithValue('Rejestracja nie powiodła się');
    }

    return data;
  }
);
