import { logoutUser } from './thunk';

export const logoutUserReducer = (builder) => {
  builder.addCase(logoutUser.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(logoutUser.fulfilled, (state) => {
    state.isLoading = false;
    state.isAuthenticated = false;
    state.data = null;
    state.token = null;
  });

  builder.addCase(logoutUser.rejected, (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = false;
    state.data = null;
    state.token = null;
    state.error = action.payload;
  });
};
