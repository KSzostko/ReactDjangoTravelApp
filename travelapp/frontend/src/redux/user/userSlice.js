import { createSlice } from '@reduxjs/toolkit';
import { registerUserReducer } from './actions/registerUser';
import { getUserReducer } from './actions/getUser';
import { loginUserReducer } from './actions/loginUser';
import { logoutUserReducer } from './actions/logoutUser';

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
    loginUserReducer(builder);
    logoutUserReducer(builder);
  },
});

export default userSlice.reducer;
