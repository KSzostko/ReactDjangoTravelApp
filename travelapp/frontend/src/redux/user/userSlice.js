import { createSlice } from '@reduxjs/toolkit';
import { registerUserReducer } from './actions/registerUser';
import { getUserReducer } from './actions/getUser';

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
    getUserReducer(builder);
  },
});

export default userSlice.reducer;
