import { updateTravel } from './thunk';

export const updateTravelReducer = (builder) => {
  builder.addCase(updateTravel.pending, (state) => {
    state.current.isLoading = true;
    state.current.error = null;
  });

  builder.addCase(updateTravel.fulfilled, (state, action) => {
    state.current.isLoading = false;
    state.current.data = action.payload;
  });

  builder.addCase(updateTravel.rejected, (state, action) => {
    state.current.isLoading = false;
    state.current.data = null;
    state.current.error = action.payload;
  });
};
