import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../../../../services';

export const logoutUser = createAsyncThunk('user/logout', async (token) =>
  UserAPI.logout(token)
);
