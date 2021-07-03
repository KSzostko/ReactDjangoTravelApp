import { createSlice } from '@reduxjs/toolkit';
import { registerUserReducer } from './actions/registerUser';

const initialState = {
  data: null,
  isLoading: false,
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    registerUserReducer(builder);
  },
});

export default userSlice.reducer;
