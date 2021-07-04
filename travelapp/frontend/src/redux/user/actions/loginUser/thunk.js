import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../../../../services';

export const loginUser = createAsyncThunk('user/login', async (userData) =>
  UserAPI.login(userData)
);
