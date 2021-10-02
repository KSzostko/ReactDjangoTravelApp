import { getTravels } from './thunk';

export const getTravelsReducer = (builder) => {
  builder.addCase(getTravels.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(getTravels.fulfilled, (state, action) => {
    state.isLoading = false;
    state.list = action.payload;
  });

  builder.addCase(getTravels.rejected, (state, action) => {
    state.isLoading = false;
    state.list = null;
    state.error = action.payload;
  });
};
