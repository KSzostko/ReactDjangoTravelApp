import { getTravelById } from './thunk';

export const getTravelByIdReducer = (builder) => {
  builder.addCase(getTravelById.pending, (state) => {
    state.current.isLoading = true;
    state.current.error = null;
  });

  builder.addCase(getTravelById.fulfilled, (state, action) => {
    state.current.isLoading = false;
    state.current.data = action.payload;
  });

  builder.addCase(getTravelById.rejected, (state, action) => {
    state.current.isLoading = false;
    state.current.data = null;
    state.current.error = action.payload;
  });
};
