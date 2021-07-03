import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../../../../services';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData) => UserAPI.register(userData)
);
