import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../../../../services';

export const getUser = createAsyncThunk('user/getByToken', async (token) =>
  UserAPI.getUserByToken(token)
);
