import { getUser } from './thunk';

export const getUserReducer = (builder) => {
  builder.addCase(getUser.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(getUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = true;
    state.data = action.payload;
  });

  builder.addCase(getUser.rejected, (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = false;
    state.data = null;
    state.token = null;
    state.error = action.payload;
  });
};
