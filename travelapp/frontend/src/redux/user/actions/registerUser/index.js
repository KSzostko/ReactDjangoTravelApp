import { registerUser } from './thunk';

export const registerUserReducer = (builder) => {
  builder.addCase(registerUser.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(registerUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = true;
    state.data = action.payload.user;
    state.token = action.payload.token;
  });

  builder.addCase(registerUser.rejected, (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = false;
    state.data = null;
    state.token = null;
    state.error = action.payload;
  });
};
