import { loginUser } from './thunk';

export const loginUserReducer = (builder) => {
  builder.addCase(loginUser.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(loginUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = true;
    state.data = action.payload.user;
    state.token = action.payload.token;
  });

  builder.addCase(loginUser.rejected, (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = false;
    state.data = null;
    state.token = null;
    state.error = action.payload;
  });
};
