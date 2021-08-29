import { getTravelStops } from './thunk';

export const getTravelStopsReducer = (builder) => {
  builder.addCase(getTravelStops.pending, (state) => {
    state.getTravelStops.isLoading = true;
    state.getTravelStops.error = null;
  });

  builder.addCase(getTravelStops.fulfilled, (state, action) => {
    state.getTravelStops.isLoading = false;
    state.getTravelStops.data = action.payload;
  });

  builder.addCase(getTravelStops.rejected, (state, action) => {
    state.getTravelStops.isLoading = false;
    state.getTravelStops.data = null;
    state.getTravelStops.error = action.payload;
  });
};
