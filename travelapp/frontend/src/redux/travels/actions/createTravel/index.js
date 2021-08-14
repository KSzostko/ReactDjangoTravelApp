import { createTravel } from './thunk';

export const createTravelReducer = (builder) => {
  builder.addCase(createTravel.pending, (state) => {
    state.current.isLoading = true;
    state.current.error = null;
  });

  builder.addCase(createTravel.fulfilled, (state, action) => {
    state.current.isLoading = false;
    state.current.data = action.payload;
  });

  builder.addCase(createTravel.rejected, (state, action) => {
    state.current.isLoading = false;
    state.current.data = null;
    state.current.error = action.payload;
  });
};
